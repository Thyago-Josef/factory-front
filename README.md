# React + TypeScript + Vite

# Factory Manager - Frontend

Interface web moderna e responsiva para o sistema de gestão de produção industrial.

## 📋 Sobre

Sistema frontend desenvolvido em React + TypeScript que se comunica com a API REST do backend para gerenciar:

- ✅ Cadastro e visualização de produtos
- ✅ Controle de estoque de matérias-primas
- ✅ Dashboard com sugestões inteligentes de produção
- ✅ Execução de ordens de produção com baixa automática
- ✅ Interface responsiva (mobile-first)

---

## 🛠 Tecnologias Utilizadas

### Core
- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool e dev server de alta performance

### Estado & API
- **Redux Toolkit** - Gerenciamento de estado global
- **RTK Query** - Cache e sincronização de dados da API
- **Axios** - Cliente HTTP para requisições REST

### UI & Estilização
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones moderna
- **CSS Modules** - Estilos encapsulados por componente

### Qualidade de Código
- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formatador de código
- **TypeScript Strict Mode** - Tipagem rigorosa

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js 18+](https://nodejs.org/) (recomendado: 20 LTS)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Backend rodando em http://localhost:8080

### Instalação
```bash
# 1. Clone o repositório (se ainda não fez)
git clone https://github.com/seu-usuario/factory-manager.git
cd factory-manager/frontend

# 2. Instale as dependências
npm install
# ou
yarn install
```

### Executar em Modo Desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em: **http://localhost:5173**

### Build para Produção
```bash
# Gerar build otimizado
npm run build
# ou
yarn build

# Pré-visualizar build de produção
npm run preview
# ou
yarn preview
```

Os arquivos serão gerados em `dist/`

---

## 🏗️ Estrutura do Projeto
```
frontend/
├── public/                      # Arquivos estáticos
├── src/
│   ├── app/                     # Configuração do Redux
│   │   ├── hooks.ts            # Hooks tipados (useAppDispatch, useAppSelector)
│   │   └── store.ts            # Store do Redux
│   ├── components/              # Componentes React
│   │   ├── layout/
│   │   │   └── Header.tsx      # Cabeçalho com navegação
│   │   ├── Dashboard.tsx       # Tela principal com sugestões
│   │   ├── ProductForm.tsx     # Formulário de cadastro de produtos
│   │   ├── MaterialList.tsx    # Lista de matérias-primas
│   │   └── ProductionModal.tsx # Modal de execução de produção
│   ├── features/                # Redux slices
│   │   ├── productSlice.ts     # Estado de produtos e sugestões
│   │   └── materialSlice.ts    # Estado de matérias-primas
│   ├── services/                # Serviços de API
│   │   ├── api.ts              # Configuração do Axios
│   │   ├── productService.ts   # Endpoints de produtos
│   │   └── materialService.ts  # Endpoints de matérias-primas
│   ├── hooks/                   # Custom hooks
│   │   └── useFormatter.ts     # Formatação de valores
│   ├── types/                   # TypeScript interfaces
│   │   └── index.ts            # Tipos compartilhados
│   ├── App.tsx                  # Componente raiz
│   ├── main.tsx                 # Entry point
│   └── index.css                # Estilos globais + Tailwind
├── .env.example                 # Template de variáveis de ambiente
├── .gitignore
├── package.json
├── tsconfig.json                # Configuração TypeScript
├── vite.config.ts               # Configuração Vite
├── tailwind.config.js           # Configuração Tailwind
└── README.md
```

---

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (ou copie `.env.example`):
```env
# URL da API backend
VITE_API_URL=http://localhost:8080

# Outras configurações (opcional)
VITE_APP_NAME=Factory Manager
```

### Conectar a API

O frontend espera que o backend esteja rodando em `http://localhost:8080`.

Para alterar a URL da API:

1. Edite o arquivo `.env`:
```env
VITE_API_URL=http://seu-backend.com
```

2. Ou edite diretamente em `src/services/api.ts`:
```typescript
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
});
```

---

## 🎨 Componentes Principais

### Dashboard

Tela inicial que exibe:
- Valor total de produção possível
- Cards de sugestões de produtos priorizados por valor
- Botão para abrir modal de execução de produção

**Localização:** `src/components/Dashboard.tsx`

### ProductForm

Formulário completo para cadastro de produtos com:
- Dados básicos (código, nome, preço)
- Associação de matérias-primas
- Validação em tempo real

**Localização:** `src/components/ProductForm.tsx`

### MaterialList

Lista responsiva de matérias-primas com:
- Visualização em tabela (desktop)
- Visualização em cards (mobile)
- Indicadores de estoque baixo
- Botão de refresh

**Localização:** `src/components/MaterialList.tsx`

### ProductionModal

Modal para execução de produção contendo:
- Informações do produto
- Input de quantidade
- Validação de capacidade máxima
- Lista de materiais necessários
- Cálculo dinâmico de custo

**Localização:** `src/components/ProductionModal.tsx`

---

## 📱 Responsividade

O sistema foi desenvolvido com abordagem **mobile-first** utilizando Tailwind CSS:

### Breakpoints
```css
/* Mobile: padrão (< 640px) */
/* Tablet: sm (≥ 640px) */
/* Desktop: md (≥ 768px) */
/* Large: lg (≥ 1024px) */
/* XL: xl (≥ 1280px) */
```

### Exemplos de Uso
```tsx
// Padding responsivo
className="p-4 md:p-6"

// Grid responsivo
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"

// Texto responsivo
className="text-base md:text-lg lg:text-xl"

// Visibilidade condicional
className="hidden md:block"  // Só aparece no desktop
className="md:hidden"         // Só aparece no mobile
```

---

## 🧪 Scripts Disponíveis
```bash
# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Linting
npm run lint

# Formatação de código
npm run format

# Type checking
npm run type-check
```

---

## 🎯 Funcionalidades Implementadas

### Requisitos Funcionais
- [x] **RF005** - Interface para CRUD de produtos
- [x] **RF006** - Interface para CRUD de matérias-primas
- [x] **RF007** - Interface para associar matérias-primas aos produtos
- [x] **RF008** - Interface para listar sugestões de produção

### Requisitos Não Funcionais
- [x] **RNF001** - Compatível com Chrome, Firefox, Edge
- [x] **RNF003** - Interface responsiva (mobile-first)
- [x] **RNF006** - Desenvolvido em React + Redux

### Diferenciais
- [x] Design moderno e intuitivo
- [x] Animações e transições suaves
- [x] Estados de loading e erro tratados
- [x] Feedback visual para ações do usuário
- [x] Formatação inteligente de valores monetários
- [x] Validação de formulários em tempo real
- [x] TypeScript para type safety

---

## 🐛 Solução de Problemas

### Erro: "Cannot connect to backend"

**Causa:** Backend não está rodando ou CORS não configurado.

**Solução:**
```bash
# 1. Verifique se o backend está rodando
curl http://localhost:8080/products

# 2. Verifique CORS no backend (application.properties)
quarkus.http.cors=true
quarkus.http.cors.origins=http://localhost:5173
```

### Erro: "Module not found"

**Causa:** Dependências não instaladas.

**Solução:**
```bash
# Limpe e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Build falha no Vercel/Netlify

**Causa:** Variáveis de ambiente não configuradas.

**Solução:**
```bash
# Configure no painel do serviço:
VITE_API_URL=https://seu-backend-api.com
```

### Estilos Tailwind não aparecem

**Causa:** Tailwind não configurado corretamente.

**Solução:**
```bash
# Verifique se existe:
# - tailwind.config.js
# - postcss.config.js
# - import './index.css' no main.tsx
```

---

## 📦 Deploy

### Vercel (Recomendado)
```bash
# 1. Instale Vercel CLI
npm i -g vercel

# 2. Faça login
vercel login

# 3. Deploy
vercel --prod
```

Ou conecte seu repositório GitHub diretamente no painel do Vercel.

**Configure variáveis de ambiente:**
- `VITE_API_URL` = URL do seu backend em produção

### Netlify
```bash
# 1. Build local
npm run build

# 2. Deploy via Netlify CLI
npx netlify-cli deploy --prod --dir=dist
```

Ou arraste a pasta `dist/` no painel do Netlify.

### Docker (Nginx)
```dockerfile
# Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
```bash
docker build -t factory-frontend .
docker run -p 80:80 factory-frontend
```

---

## 🎨 Customização de Tema

### Cores Principais (Tailwind)

Edite `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#111827',    // slate-900
        secondary: '#10b981',  // emerald-500
        accent: '#3b82f6',     // blue-500
      }
    }
  }
}
```

### Fontes

Adicione no `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

E no `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Inter', 'sans-serif'],
}
```

---

## 📖 Documentação Adicional

- [React Documentation](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🤝 Contribuição

Este projeto foi desenvolvido para o teste prático da Autoflex.

### Padrões de Código

- Use TypeScript strict mode
- Siga as regras do ESLint
- Componentes funcionais com hooks
- Props tipadas com interfaces
- CSS via Tailwind (evite CSS inline)

---

## 👨‍💻 Autor

Desenvolvido como solução para o teste prático da **Autoflex**.

**GitHub:** [seu-usuario](https://github.com/seu-usuario)  
**LinkedIn:** [seu-perfil](https://linkedin.com/in/seu-perfil)

---

## 📄 Licença

Este projeto foi desenvolvido para fins de avaliação técnica.