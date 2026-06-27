import { describe, it, expect } from 'vitest';
import { splitYAML, joinYAML, composeDocument } from './frontmatter';

describe('splitYAML', () => {
  it('returns empty frontmatter when no ---', () => {
    const result = splitYAML('# Hello\n');
    expect(result.frontmatter).toEqual({});
    expect(result.body).toBe('# Hello\n');
  });

  it('parses simple frontmatter', () => {
    const md = `---
title: Hello
tags: [a, b]
---
# Body`;
    const result = splitYAML(md);
    expect(result.frontmatter).toEqual({ title: 'Hello', tags: ['a', 'b'] });
    expect(result.body).toBe('# Body');
  });

  it('handles missing closing ---', () => {
    const md = `---
title: Hello
# Body without closing`;
    const result = splitYAML(md);
    expect(result.frontmatter).toEqual({});
    expect(result.body).toBe(md);
  });

  it('preserves unknown fields as pass-through', () => {
    const md = `---
title: Hello
custom_field: anything
nested:
  a: 1
  b: 2
---
# Body`;
    const result = splitYAML(md);
    expect(result.frontmatter).toEqual({
      title: 'Hello',
      custom_field: 'anything',
      nested: { a: 1, b: 2 },
    });
  });
});

describe('joinYAML', () => {
  it('returns just body when frontmatter is empty', () => {
    expect(joinYAML({}, 'Hello')).toBe('Hello');
  });

  it('formats frontmatter and body', () => {
    const out = joinYAML({ title: 'Hi', tags: ['a'] }, '# Body');
    expect(out).toMatch(/^---\n/);
    expect(out).toContain('title: Hi');
    expect(out).toContain('# Body');
  });

  it('round-trips with splitYAML', () => {
    const original = `---
title: Test
tags: [x, y]
---
content`;
    const { frontmatter, body } = splitYAML(original);
    const joined = joinYAML(frontmatter, body);
    const reparsed = splitYAML(joined);
    expect(reparsed.frontmatter).toEqual(frontmatter);
    expect(reparsed.body).toBe(body);
  });
});

describe('splitYAML.frontmatterText', () => {
  it('returns empty frontmatterText when no ---', () => {
    const result = splitYAML('# Hello\n');
    expect(result.frontmatterText).toBe('');
  });

  it('returns the raw frontmatter block including delimiters', () => {
    const md = `---
title: Hello
tags: [a, b]
---
# Body`;
    const result = splitYAML(md);
    expect(result.frontmatterText).toBe('---\ntitle: Hello\ntags: [a, b]\n---\n');
  });
});

describe('composeDocument (YAML preservation path)', () => {
  it('returns just body when there is no original frontmatter', () => {
    expect(composeDocument('', '# Body')).toBe('# Body');
  });

  it('preserves the original frontmatter text verbatim when given body only', () => {
    const originalFm = "---\ntitle: 'Workspace'\ntimestamp: '2026-04-19T08:57:00.000Z'\n---\n\n";
    const result = composeDocument(originalFm, '# New body');
    expect(result).toBe(originalFm + '# New body');
  });

  it('inserts a blank line when original frontmatter lacks trailing blank line', () => {
    const originalFm = "---\ntitle: A\n---\n";
    const result = composeDocument(originalFm, 'body');
    expect(result).toBe('---\ntitle: A\n---\n\nbody');
  });

  it('does not duplicate blank lines when original already has one', () => {
    const originalFm = "---\ntitle: A\n---\n\n";
    const result = composeDocument(originalFm, 'body');
    expect(result).toBe('---\ntitle: A\n---\n\nbody');
  });

  it('handles empty body by returning the frontmatter text as-is', () => {
    const originalFm = "---\ntitle: A\n---\n";
    expect(composeDocument(originalFm, '')).toBe(originalFm);
  });

  it('preserves single-quoted strings (the bug)', () => {
    // The original Workspace.md has single-quoted timestamp. yaml.dump would
    // strip the quotes and reformat the value, breaking the original format.
    // composeDocument must preserve the original text byte-for-byte.
    const original = `---
type: Notion Page
title: Workspace
timestamp: '2026-04-19T08:57:00.000Z'
notion_id: 346a90d9-0b97-80df-92d6-f20fe9611502
---
`;
    // Simulate "user only edited the body, not the frontmatter"
    const edited = composeDocument(original, '\n# My new content\n');
    expect(edited).toContain("timestamp: '2026-04-19T08:57:00.000Z'");
    expect(edited).toContain('# My new content');
    // The original quoting must survive — never let yaml.dump touch it.
    expect(edited).not.toContain('timestamp: 2026-04-19T08:57:00.000Z');
  });
});
