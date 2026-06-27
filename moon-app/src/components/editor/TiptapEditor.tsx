'use client';

/**
 * TiptapEditor — 富文本编辑器（彻底修复了初始化加载时触发 auto-save 与丢失 YAML frontmatter/Body 内容的严重 Bug）。
 */

import { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import type { Editor } from '@tiptap/react';
import { splitYAML } from '@/lib/frontmatter';
import { mdToHtml, htmlToMd } from '@/lib/markdown-serde';
import { Bold, Italic, Underline as UnderlineIcon, Strikethrough, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Code, Link as LinkIcon, Undo, Redo } from 'lucide-react';

type TiptapEditorProps = {
  fileHandle: FileSystemFileHandle | null;
  filePath: string | null;
  onChange: (markdown: string) => void;
  onLoadFrontmatter?: (fm: Record<string, unknown>, fmText: string) => void;
  onLoadBody?: (body: string) => void;
  editorRef?: (editor: Editor | null) => void;
};

export function TiptapEditor({ fileHandle, filePath, onChange, onLoadFrontmatter, onLoadBody, editorRef }: TiptapEditorProps) {
  // 用来标记是否正在载入/设置文件内容，避免初始化 setContent 时触发 onChange 并标记为 dirty
  const isSettingContent = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'tiptap-link' },
      }),
      Placeholder.configure({ placeholder: '开始写作…' }),
    ],
    content: '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // 载入过程中不应触发 onChange，防止未修改内容却触发 auto-save
      if (isSettingContent.current) return;
      onChange(htmlToMd(editor.getHTML()));
    },
    editorProps: {
      attributes: { class: 'tiptap-content' },
      handleClick(_view, _pos, event) {
        const target = event.target as HTMLElement | null;
        if (!target) return false;
        const link = target.closest('a[href]') as HTMLAnchorElement | null;
        if (!link) return false;
        if (!event.metaKey && !event.ctrlKey) return false;
        const href = link.getAttribute('href');
        if (!href || !href.endsWith('.md')) return false;
        event.preventDefault();
        window.dispatchEvent(new CustomEvent('double-link-click', { detail: { href } }));
        return true;
      },
    },
  });

  useEffect(() => {
    if (editorRef) editorRef(editor);
  }, [editor, editorRef]);

  useEffect(() => {
    if (!editor || !fileHandle) return;
    void (async () => {
      try {
        const file = await fileHandle.getFile();
        const text = await file.text();
        const { frontmatter: fm, body, frontmatterText: fmText } = splitYAML(text);
        const html = mdToHtml(body);

        isSettingContent.current = true;
        editor.commands.setContent(html, { parseOptions: { preserveWhitespace: 'full' } });
        onLoadFrontmatter?.(fm, fmText);
        onLoadBody?.(body); // 极其关键：在此同步载入父组件中的 bodyMd 状态，防止为空保存
        
        // 微任务或延时重置标记，确保 Tiptap 渲染事件处理完毕
        setTimeout(() => {
          isSettingContent.current = false;
        }, 100);
      } catch (err) {
        console.error('load file failed:', err);
        isSettingContent.current = false;
      }
    })();
  }, [editor, fileHandle, filePath]);

  if (!editor) return null;

  return (
    <div className="tiptap-wrapper">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const btn = (active: boolean) => [
    'p-1.5 rounded transition-colors duration-120 flex items-center justify-center cursor-pointer focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed',
    active
      ? 'bg-accentMuted text-accent border border-accent/20'
      : 'text-fgSecondary hover:bg-sidebarHoverBg hover:text-fg border border-transparent'
  ].join(' ');

  return (
    <div className="tiptap-toolbar flex flex-wrap items-center gap-1 px-4 py-2 bg-sidebarBg border-b border-borderSubtle flex-shrink-0 select-none">
      <button type="button" className={btn(editor.isActive('bold'))} onClick={() => editor.chain().focus().toggleBold().run()} title="粗体">
        <Bold size={15} />
      </button>
      <button type="button" className={btn(editor.isActive('italic'))} onClick={() => editor.chain().focus().toggleItalic().run()} title="斜体">
        <Italic size={15} />
      </button>
      <button type="button" className={btn(editor.isActive('underline'))} onClick={() => editor.chain().focus().toggleUnderline().run()} title="下划线">
        <UnderlineIcon size={15} />
      </button>
      <button type="button" className={btn(editor.isActive('strike'))} onClick={() => editor.chain().focus().toggleStrike().run()} title="删除线">
        <Strikethrough size={15} />
      </button>

      <span className="w-[1px] h-4 bg-borderSubtle mx-1.5" />

      <button type="button" className={btn(editor.isActive('heading', { level: 1 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="标题 1">
        <Heading1 size={15} />
      </button>
      <button type="button" className={btn(editor.isActive('heading', { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="标题 2">
        <Heading2 size={15} />
      </button>
      <button type="button" className={btn(editor.isActive('heading', { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="标题 3">
        <Heading3 size={15} />
      </button>

      <span className="w-[1px] h-4 bg-borderSubtle mx-1.5" />

      <button type="button" className={btn(editor.isActive('bulletList'))} onClick={() => editor.chain().focus().toggleBulletList().run()} title="无序列表">
        <List size={15} />
      </button>
      <button type="button" className={btn(editor.isActive('orderedList'))} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="有序列表">
        <ListOrdered size={15} />
      </button>
      <button type="button" className={btn(editor.isActive('blockquote'))} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="引用块">
        <Quote size={15} />
      </button>
      <button type="button" className={btn(editor.isActive('codeBlock'))} onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="代码块">
        <Code size={15} />
      </button>

      <span className="w-[1px] h-4 bg-borderSubtle mx-1.5" />

      <button type="button" className={btn(editor.isActive('link'))} onClick={() => {
        const url = window.prompt('链接 URL', editor.getAttributes('link').href ?? '');
        if (url === null) return;
        if (url === '') editor.chain().focus().unsetLink().run();
        else editor.chain().focus().setLink({ href: url }).run();
      }} title="插入链接">
        <LinkIcon size={15} />
      </button>

      <span className="w-[1px] h-4 bg-borderSubtle mx-1.5" />

      <button type="button" className={btn(false)} onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="撤销">
        <Undo size={15} />
      </button>
      <button type="button" className={btn(false)} onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="重做">
        <Redo size={15} />
      </button>
    </div>
  );
}
