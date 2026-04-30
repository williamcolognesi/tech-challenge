# Documentação de Componentes - Storybook

Esta é a documentação completa de todos os componentes do projeto **No Bolso**.

## 🎯 Visão Geral

Todos os componentes estão documentados com **Storybook**. Para visualizar:

```bash
npm run storybook
```

Abre em: http://localhost:6006

---

## 📚 Componentes Documentados

### UI Components (Shadcn/ui)

#### 🔘 Button

- **Variantes**: default, secondary, ghost, destructive, outline, link
- **Tamanhos**: xs, sm, default, lg, icon
- **Features**: Ícones, loading state, disabled
- **Stories**: button.stories.tsx

#### 📝 Input

- **Tipos**: text, email, password, number, date
- **Features**: Placeholder, disabled, pre-filled values
- **Stories**: input.stories.tsx

#### 📦 Card

- **Componentes**: CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Tamanhos**: default, sm
- **Features**: Com imagem, múltiplos cards
- **Stories**: card.stories.tsx

#### 🏷️ Badge

- **Variantes**: default, secondary, destructive, outline
- **Features**: Integrado com texto, múltiplos badges
- **Stories**: badge.stories.tsx

#### 🪟 Dialog

- **Features**: Modal customizável, com form
- **Exemplos**: Simples, com formulário
- **Stories**: dialog.stories.tsx

#### ☑️ Checkbox

- **States**: default, checked, disabled
- **Features**: Com label, múltiplas opções
- **Stories**: checkbox.stories.tsx

#### 🏷️ Label

- **Features**: Com input, com checkbox, em forms
- **Stories**: label.stories.tsx

#### 🎨 Select

- **Features**: Com placeholder, disabled, múltiplos itens
- **Stories**: select.stories.tsx

#### 👤 Avatar

- **Features**: Com imagem, fallback, múltiplos avatares
- **Stories**: avatar.stories.tsx

#### 📊 Table

- **Features**: Com caption, múltiplas linhas
- **Exemplos**: Lista de usuários, transações
- **Stories**: table.stories.tsx

#### ⚠️ AlertDialog

- **Tipos**: Confirmação, deleção
- **Features**: Ações customizáveis
- **Stories**: alert-dialog.stories.tsx

#### 📅 Calendar

- **Modos**: single, multiple, range
- **Features**: Seleção de datas
- **Stories**: calendar.stories.tsx

#### ➖ Separator

- **Orientações**: horizontal, vertical
- **Features**: Em listas, customizável
- **Stories**: separator.stories.tsx

#### 💬 Popover

- **Features**: Com trigger, conteúdo customizável
- **Exemplos**: Popover simples, com ajuda
- **Stories**: popover.stories.tsx

#### 📈 Chart

- **Tipos**: LineChart, BarChart (Recharts)
- **Features**: Interativo, responsivo
- **Stories**: chart.stories.tsx

#### 🔔 Sonner

- Documentação em: components/ui/sonner.tsx
- **Tipos**: toast, success, error, loading

#### 📄 Sheet

- **Features**: Drawer/Modal lateral
- Documentação em: components/ui/sheet.tsx

### Custom Components

#### 💳 VirtualCard

- **Descrição**: Cartão virtual animado com mudança de dígitos
- **Features**: Animação a cada 2 segundos, design premium
- **Localização**: components/virtual-card.tsx
- **Stories**: virtual-card.stories.tsx

### Layout Components

#### 🎨 Header

- **Localização**: components/layout/header.tsx
- **Features**: Navegação, user menu
- **Documentação**: components/layout/README.md

#### 📋 Sidebar

- **Localização**: components/layout/sidebar.tsx
- **Features**: Menu lateral, colapsável
- **Documentação**: components/layout/README.md

---

## 🚀 Como Usar no Projeto

### Import básico

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
```

### Exemplo completo

```tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MyForm() {
  const [email, setEmail] = useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Form</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button onClick={() => console.log(email)}>Submit</Button>
      </CardContent>
    </Card>
  )
}
```

---

## 🎯 Estrutura de Stories

Cada componente tem uma story com:

1. **Default** - Uso básico
2. **Variações** - Diferentes props/variants
3. **Estados** - disabled, loading, etc
4. **Combinações** - Múltiplos componentes juntos

Exemplo:

```tsx
// components/ui/button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: "Click me" },
}

export const Primary: Story = {
  args: { children: "Primary", variant: "default" },
}

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
}
```

---

## 📊 Contagem de Componentes

| Categoria  | Componentes | Status         |
| ---------- | ----------- | -------------- |
| **UI**     | 14+         | ✅ Documentado |
| **Layout** | 2           | ✅ Documentado |
| **Custom** | 1           | ✅ Documentado |
| **Total**  | 18+         | ✅ 100%        |

---

## 🔗 Links Rápidos

- [Storybook](http://localhost:6006) - Componentes visuais
- [Shadcn UI](https://ui.shadcn.com) - Documentação oficial
- [Tailwind CSS](https://tailwindcss.com) - Estilos

---

## 🎨 Personalizando Componentes

Para customizar um componente, edite diretamente o arquivo `.tsx`:

```tsx
// components/ui/button.tsx
const buttonVariants = cva(
  // Estilos base
  "px-4 py-2 rounded-lg...",
  {
    variants: {
      variant: {
        primary: "bg-blue-500",
        secondary: "bg-gray-500",
      },
    },
  },
)
```

---

## 📝 Adicionando Novo Componente

1. Crie arquivo em `components/ui/meu-componente.tsx`
2. Crie story em `components/ui/meu-componente.stories.tsx`
3. Export em stories
4. Execute `npm run storybook` para ver

Exemplo:

```tsx
// components/ui/meu-componente.tsx
export function MeuComponente() {
  return <div>Meu Componente</div>
}
```

```tsx
// components/ui/meu-componente.stories.tsx
import { MeuComponente } from "./meu-componente"

export default {
  title: "UI/MeuComponente",
  component: MeuComponente,
}

export const Default = {}
```

---

## 🆘 Troubleshooting

### Storybook não inicia

```bash
npm install
npm run storybook
```

### Componente não aparece

1. Verifique se a story está em `components/`
2. Confirme o arquivo tem `.stories.tsx`
3. Reinicie Storybook

### Estilos não aplicam

1. Certifique-se que Tailwind está configurado
2. Verifique o arquivo `tailwind.config.ts`
3. Limpe cache: `npm run build-storybook --clean`

---

**Última atualização**: Abril 2026  
**Total de Componentes**: 18+  
**Status**: ✅ Completo e Documentado
