'use client';

import { useCallback } from 'react';
import {
  readDirectoryEntries,
  createFile,
  createDir,
  renameEntry,
  deleteEntry,
  generateUniqueFilename,
  slugify,
  updateDocumentTitle,
  ensureDocumentContainer,
  getFileHandleByPath,
} from '@/lib/fs-access';
import type { FileEntry } from '@/types/document';

type UseFileTreeParams = {
  rootHandle: FileSystemDirectoryHandle | null;
  onTreeChange: () => void;
  onOpenFile: (handle: FileSystemFileHandle, path: string) => void;
};

export function useFileTree({ rootHandle, onTreeChange, onOpenFile }: UseFileTreeParams) {
  const refresh = useCallback(async () => {
    if (!rootHandle) return;
    return await readDirectoryEntries(rootHandle);
  }, [rootHandle]);

  const createNewFile = useCallback(
    async (
      parent: FileSystemDirectoryHandle,
      parentPath: string,
      title: string,
    ): Promise<void> => {
      if (!title.trim()) return;
      const base = slugify(title) + '.md';
      const existingNames = new Set<string>();
      for await (const [name] of parent.entries()) existingNames.add(name);
      const filename = generateUniqueFilename(base, (n) => existingNames.has(n));
      const content = `---\ntype: Local Page\ntitle: ${title}\nnotion_id: local-${crypto.randomUUID()}\n---\n\n`;
      const handle = await createFile(parent, filename, content);
      onTreeChange();
      onOpenFile(handle, parentPath ? `${parentPath}/${filename}` : filename);
    },
    [onTreeChange, onOpenFile],
  );

  const createNewDir = useCallback(
    async (parent: FileSystemDirectoryHandle, parentPath: string, title: string) => {
      if (!title.trim()) return;
      const existingNames = new Set<string>();
      for await (const [name] of parent.entries()) existingNames.add(name);
      const dirname = generateUniqueFilename(slugify(title), (n) => existingNames.has(n));
      const dirHandle = await createDir(parent, dirname);
      const indexHandle = await createFile(
        dirHandle,
        'index.md',
        `---\ntype: Local Page\ntitle: ${title}\nnotion_id: local-${crypto.randomUUID()}\n---\n\n`,
      );
      onTreeChange();
      onOpenFile(indexHandle, parentPath ? `${parentPath}/${dirname}/index.md` : `${dirname}/index.md`);
    },
    [onTreeChange, onOpenFile],
  );

  const rename = useCallback(
    async (
      entry: FileEntry,
      entryPath: string,
      newTitle: string,
    ): Promise<string> => {
      if (!rootHandle) return entryPath;
      const newName = entry.kind === 'file' ? slugify(newTitle) + '.md' : slugify(newTitle);
      if (newName === entry.name) {
        return entry.kind === 'dir' ? `${entryPath}/index.md` : entryPath;
      }
      await renameEntry(entry.handle, newName);
      if (entry.kind === 'file') {
        const renamedPath = entryPath.split('/').filter(Boolean).slice(0, -1).concat(newName).join('/');
        const renamedHandle = await getFileHandleByPath(rootHandle, renamedPath);
        await updateDocumentTitle(renamedHandle, newTitle);
        onTreeChange();
        return renamedPath;
      }
      const parentSegments = entryPath.split('/').filter(Boolean).slice(0, -1);
      const renamedDirPath = [...parentSegments, newName].join('/');
      const indexHandle = await getFileHandleByPath(
        rootHandle,
        `${renamedDirPath}/index.md`,
      );
      await updateDocumentTitle(indexHandle, newTitle);
      onTreeChange();
      return `${renamedDirPath}/index.md`;
    },
    [onTreeChange, rootHandle],
  );

  const remove = useCallback(
    async (entry: { name: string }, parent: FileSystemDirectoryHandle) => {
      await deleteEntry(parent, entry.name);
      onTreeChange();
    },
    [onTreeChange],
  );

  const createChildDocument = useCallback(
    async (entry: FileEntry, entryPath: string, title: string) => {
      if (!rootHandle || !title.trim()) return;
      if (entry.kind === 'dir') {
        await createNewFile(entry.handle as FileSystemDirectoryHandle, entryPath, title);
        return;
      }
      const { dirHandle, path } = await ensureDocumentContainer(rootHandle, entryPath);
      await createNewFile(dirHandle, path, title);
    },
    [createNewFile, rootHandle],
  );

  return { refresh, createNewFile, createNewDir, rename, remove, createChildDocument };
}
