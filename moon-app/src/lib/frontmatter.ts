import * as yaml from 'js-yaml';
import type { Frontmatter } from '@/types/document';

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export type SplitYAMLResult = {
  frontmatter: Frontmatter;
  body: string;
  /** The raw frontmatter block as it appeared in the file, including the
   * leading and trailing `---` delimiters and the trailing newline.
   * Empty string when the file has no frontmatter. */
  frontmatterText: string;
};

export function splitYAML(text: string): SplitYAMLResult {
  const match = text.match(FRONTMATTER_RE);
  if (!match) return { frontmatter: {}, body: text, frontmatterText: '' };

  let parsed: Frontmatter;
  try {
    const result = yaml.load(match[1]);
    parsed = result && typeof result === 'object' && !Array.isArray(result)
      ? (result as Frontmatter)
      : {};
  } catch (err) {
    console.warn('YAML parse failed, treating as no frontmatter:', err);
    return { frontmatter: {}, body: text, frontmatterText: '' };
  }

  const body = text.slice(match[0].length).replace(/^\n/, '');
  return { frontmatter: parsed, body, frontmatterText: match[0] };
}

export function joinYAML(frontmatter: Frontmatter, body: string): string {
  if (Object.keys(frontmatter).length === 0) return body;
  const yamlStr = yaml.dump(frontmatter, { lineWidth: -1, noRefs: true });
  return `---\n${yamlStr}---\n\n${body}`;
}

/**
 * Compose the full file text from a (possibly original) frontmatter block and a body.
 * If `frontmatterText` is empty (no frontmatter in the file), returns just the body.
 * Otherwise concatenates the original frontmatter block with the new body, inserting
 * a single blank line between them when the original block does not already end with one.
 *
 * This is used to preserve the original frontmatter formatting (quoting, ordering,
 * comments) on save when the user has not modified frontmatter fields — the editor
 * never round-trips YAML through `yaml.dump` unless the user actually edited fields.
 */
export function composeDocument(frontmatterText: string, body: string): string {
  if (!frontmatterText) return body;
  if (body.length === 0) return frontmatterText;
  // Ensure exactly one blank line between the closing `---` of the frontmatter and the body.
  if (frontmatterText.endsWith('\n\n')) return frontmatterText + body;
  if (frontmatterText.endsWith('\n')) return frontmatterText + '\n' + body;
  return frontmatterText + '\n\n' + body;
}