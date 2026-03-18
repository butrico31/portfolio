import styled from "styled-components";
import React, { useState } from "react";

const TOKEN_STYLE = {
    keyword:     'var(--syn-keyword)',
    string:      'var(--syn-string)',
    number:      'var(--syn-number)',
    key:         'var(--syn-key)',
    type:        'var(--syn-type)',
    comment:     'var(--syn-comment)',
    punctuation: 'var(--syn-punctuation)',
    operator:    'var(--syn-operator)',
    text:        'var(--code-text)',
};

const TS_KEYWORDS = ['interface', 'const', 'export', 'default', 'string', 'number', 'boolean', 'import', 'from', 'return', 'type'];
const TS_TYPES    = ['Developer'];

function tokenizeJSON(line) {
    const tokens = [];
    let rem = line;
    const patterns = [
        { type: 'key',         re: /^("(?:[^"\\]|\\.)*")(?=\s*:)/ },
        { type: 'string',      re: /^"(?:[^"\\]|\\.)*"/ },
        { type: 'number',      re: /^-?\d+(?:\.\d+)?/ },
        { type: 'keyword',     re: /^\b(true|false|null)\b/ },
        { type: 'punctuation', re: /^[{}[\],:]/ },
        { type: 'text',        re: /^./ },
    ];
    while (rem.length > 0) {
        for (const { type, re } of patterns) {
            const m = rem.match(re);
            if (m) { tokens.push({ type, text: m[0] }); rem = rem.slice(m[0].length); break; }
        }
    }
    return tokens;
}

function tokenizeTS(line) {
    const tokens = [];
    let rem = line;
    const kwRe   = new RegExp(`^\\b(${TS_KEYWORDS.join('|')})\\b`);
    const typeRe  = new RegExp(`^\\b(${TS_TYPES.join('|')})\\b`);
    const patterns = [
        { type: 'comment',     re: /^\/\/.*/ },
        { type: 'string',      re: /^'(?:[^'\\]|\\.)*'/ },
        { type: 'string',      re: /^"(?:[^"\\]|\\.)*"/ },
        { type: 'number',      re: /^\b\d+(?:\.\d+)?\b/ },
        { type: 'keyword',     re: kwRe },
        { type: 'type',        re: typeRe },
        { type: 'key',         re: /^\b\w+\b(?=\s*[?:](?!:))/ },
        { type: 'operator',    re: /^[=><]/ },
        { type: 'punctuation', re: /^[{}[\];,().]/ },
        { type: 'text',        re: /^\w+/ },
        { type: 'text',        re: /^./ },
    ];
    while (rem.length > 0) {
        for (const { type, re } of patterns) {
            const m = rem.match(re);
            if (m) { tokens.push({ type, text: m[0] }); rem = rem.slice(m[0].length); break; }
        }
    }
    return tokens;
}

function HighlightedLine({ line, fileType }) {
    if (line.trim() === '') return <span> </span>;
    const tokens = fileType === 'json' ? tokenizeJSON(line) : tokenizeTS(line);
    return (
        <>
            {tokens.map((tok, i) => (
                <span key={i} style={{ color: TOKEN_STYLE[tok.type] }}>{tok.text}</span>
            ))}
        </>
    );
}

export default function CodeDisplay() {
    const [activeTab, setActiveTab] = useState("portfolio.json");

    const codeFiles = {
        "portfolio.json": [
            '{',
            '    "name": "Vinícius Butrico",',
            '    "role": "Full Stack Developer",',
            '    "experience": "~8 Meses",',
            '    "technologies": ["React", "Node.js", "JavaScript", "Docker"],',
            '    "projects": {',
            '        "completed": 6,',
            '        "github_repos": 20,',
            '        "contributions": 125',
            '    },',
            '    "status": "Disponível para novos projetos"',
            '}'
        ],
        "skills.ts": [
            "interface Developer {",
            "  frontend: string[];",
            "  backend: string[];",
            "  database: string[];",
            "  devops: string[];",
            "}",
            "",
            "const mySkills: Developer = {",
            "  frontend: ['React', 'Vue.js', 'JavaScript'],",
            "  backend: ['Node.js', 'Java'],",
            "  database: ['MongoDB'],",
            "  devops: ['Docker', 'AWS EC2']",
            "};",
            "",
            "export default mySkills;"
        ],
    };

    const fileType = activeTab.endsWith('.json') ? 'json' : 'ts';

    return (
        <Container>
            <EditorHeader>
                <VSCodeTitle>VS Code - Portfolio</VSCodeTitle>
            </EditorHeader>

            <TabsContainer>
                {Object.keys(codeFiles).map((filename) => (
                    <Tab
                        key={filename}
                        $active={activeTab === filename}
                        onClick={() => setActiveTab(filename)}
                    >
                        {filename}
                    </Tab>
                ))}
            </TabsContainer>

            <CodeEditor>
                {codeFiles[activeTab].map((line, index) => (
                    <CodeLine key={index}>
                        <LineNumber>{index + 1}</LineNumber>
                        <LineContent>
                            <HighlightedLine line={line} fileType={fileType} />
                        </LineContent>
                    </CodeLine>
                ))}
            </CodeEditor>
        </Container>
    );
}

const Container = styled.section`
    width: 100%;
    max-width: 700px;
    margin: 3rem auto;
    padding: 0 1rem;
    background: var(--code-bg);
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);

    @media (max-width: 768px) {
        max-width: 95%;
        margin: 2rem auto;
    }
`;

const EditorHeader = styled.div`
    background: var(--code-header);
    padding: 0.4rem 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;

    &::before {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #ff5555;
        box-shadow: 15px 0 0 #f1fa8c, 30px 0 0 #50fa7b;
    }
`;

const VSCodeTitle = styled.span`
    color: var(--code-muted);
    font-size: 0.75rem;
    font-family: 'Consolas', 'Monaco', monospace;
    margin-left: 2.5rem;
`;

const TabsContainer = styled.div`
    display: flex;
    gap: 0;
    background: var(--code-header);
    border-bottom: 1px solid var(--code-border);
`;

const Tab = styled.button`
    padding: 0.5rem 1rem;
    background: ${props => props.$active ? 'var(--code-bg)' : 'transparent'};
    color: ${props => props.$active ? 'var(--code-text)' : 'var(--code-muted)'};
    border: none;
    border-right: 1px solid var(--code-border);
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.2s ease;
    font-family: 'Consolas', 'Monaco', monospace;
    position: relative;

    ${props => props.$active && `
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--accent);
        }
    `}

    &:hover {
        background: var(--code-bg);
        color: var(--code-text);
    }

    @media (max-width: 480px) {
        padding: 0.4rem 0.7rem;
        font-size: 0.75rem;
    }
`;

const CodeEditor = styled.div`
    padding: 1rem 0;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--code-text);
    min-height: fit-content;
    overflow-x: auto;

    @media (max-width: 480px) {
        font-size: 0.75rem;
    }
`;

const CodeLine = styled.div`
    display: flex;
    padding: 0.15rem 0;

    &:hover {
        background: var(--code-hover);
    }
`;

const LineNumber = styled.span`
    min-width: 40px;
    padding: 0 0.8rem;
    text-align: right;
    color: var(--code-muted);
    user-select: none;
    font-size: 0.8rem;
    flex-shrink: 0;
`;

const LineContent = styled.pre`
    flex: 1;
    margin: 0;
    padding-right: 0.8rem;
    font-family: inherit;
    white-space: pre;
`;
