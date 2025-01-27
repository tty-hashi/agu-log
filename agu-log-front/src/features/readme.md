1. feature based modules
   下記を参考に実装してください。
   ポイントとしては、各ページごとにディレクトリを作成し、その中にコンポーネント、エンドポイント、フック、ストアを配置することです。

```
├── common
│   ├── editors
│   │   ├── components
│   │   │   ├── CodeEditor.tsx
│   │   │   └── RichTextEditor.tsx
│   │   ├── hooks.ts
│   │   └── stores.ts
│   ├── forms
│   │   ├── components
│   │   │   ├── Input.tsx
│   │   │   └── Select.tsx
│   │   ├── hooks.ts
│   │   └── stores.ts
│   └── tags
│       ├── components
│       │   ├── TagItem.tsx
│       │   └── TagList.tsx
│       ├── hooks.ts
│       └── stores.ts
└── routes
    ├── auth
    │   ├── components
    │   │   └── Login.tsx
    │   ├── endpoint.ts
    │   └── hooks.ts
    ├── post
    │   ├── detail
    │   │   ├── components
    │   │   │   ├── Contents.tsx
    │   │   │   └── Suggests.tsx
    │   │   ├── endpoint.ts
    │   │   ├── hooks.ts
    │   │   └── stores.ts
    │   └── list
    │       ├── components
    │       │   ├── List.tsx
    │       │   ├── Search.tsx
    │       │   └── Tabs.tsx
    │       ├── endpoint.ts
    │       ├── hooks.ts
    │       └── stores.ts
    └── profile
        ├── components
        │   ├── Email.tsx
        │   └── Password.tsx
        ├── endpoint.ts
        ├── hooks.ts
        └── stores.ts
```
