'use client';

/**
 * Editor — 编辑器包装组件（更新传参，同步传递 onLoadBody 与 onLoadFrontmatter，修复内容丢失 Bug）。
 */

import { TiptapEditor } from './TiptapEditor';
import type { Editor as TiptapEditorType } from '@tiptap/react';

type EditorProps = {
  fileHandle: FileSystemFileHandle | null;
  filePath: string | null;
  onDirtyChange: (dirty: boolean) => void;
  onFrontmatterChange: (fm: Record<string, unknown>, fmText: string) => void;
  onBodyChange: (md: string) => void;
  onEditorReady?: (editor: TiptapEditorType | null) => void;
};

export function Editor({
  fileHandle,
  filePath,
  onDirtyChange,
  onFrontmatterChange,
  onBodyChange,
  onEditorReady,
}: EditorProps) {
  return (
    <TiptapEditor
      fileHandle={fileHandle}
      filePath={filePath}
      onChange={(content) => {
        onDirtyChange(true);
        onBodyChange(content);
      }}
      onLoadFrontmatter={onFrontmatterChange}
      onLoadBody={onBodyChange}
      editorRef={onEditorReady}
    />
  );
}