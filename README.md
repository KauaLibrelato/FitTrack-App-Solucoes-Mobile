# FitTrack - Aplicativo de Acompanhamento de Fitness
## 📚 Documentação

- [📄 README](./README.md)
- [📝 CHANGELOG](./CHANGELOG.md)

## 📱 Sobre o FitTrack

O **FitTrack** é um aplicativo mobile de acompanhamento de fitness desenvolvido em React Native que permite aos usuários gerenciar seus treinos, acompanhar progresso, completar missões e interagir com amigos em um ambiente gamificado.

### 🎯 Principais Funcionalidades

#### 🏋️ **Gestão de Treinos**
- Criação e personalização de treinos
- Múltiplos tipos de exercícios (Cardio, Força, Flexibilidade, etc.)
- Cronometragem automática de sessões
- Histórico completo de atividades

#### 🎮 **Sistema de Gamificação**
- Sistema de níveis e experiência (XP)
- Missões
- Recompensas por conquistas
- Ranking global e entre amigos

#### 👥 **Rede Social**
- Sistema de amizades
- Ranking entre amigos
- Solicitações de amizade
- Comparação de progresso

#### 📊 **Métricas e Relatórios**
- Dias consecutivos de treino
- Tempo médio de exercícios
- Missões completadas
- Progresso de nível

#### ⚙️ **Personalização**
- Perfil customizável
- Configurações de conta
- Temas e preferências
- Gerenciamento de dados pessoais

---

## 🔍 Análise dos Principais Problemas Detectados

### 🚨 **Problemas Críticos Identificados**

#### **1. Código Duplicado e Repetitivo**
- **Problema**: Lógica de requisições HTTP repetida em múltiplos componentes
- **Impacto**: Manutenção difícil, inconsistências, bugs recorrentes
- **Exemplo**: Cada tela fazia suas próprias chamadas de API com tratamento de erro individual

#### **2. Falta de Padronização**
- **Problema**: Inconsistência na estrutura de componentes e nomenclatura
- **Impacto**: Dificuldade para novos desenvolvedores, código confuso
- **Exemplo**: Mistura de padrões de importação e estruturas de arquivos

#### **3. Ausência de Testes**
- **Problema**: Zero cobertura de testes automatizados
- **Impacto**: Regressões frequentes, medo de refatorar, bugs em produção
- **Exemplo**: Mudanças simples quebravam funcionalidades existentes

#### **4. Gerenciamento de Estado Fragmentado**
- **Problema**: Estado do usuário espalhado por múltiplos locais
- **Impacto**: Sincronização difícil, dados inconsistentes
- **Exemplo**: Informações do usuário duplicadas em vários componentes

#### **5. Tratamento de Erros Inconsistente**
- **Problema**: Cada componente tratava erros de forma diferente
- **Impacto**: UX inconsistente, debugging difícil
- **Exemplo**: Alguns erros eram silenciosos, outros muito verbosos

#### **6. Falta de Componentes Reutilizáveis**
- **Problema**: UI duplicada sem componentização adequada
- **Impacto**: Inconsistência visual, manutenção custosa
- **Exemplo**: Avatares e badges implementados múltiplas vezes

---

## 🔧 Estratégia de Refatoração

### 📋 **Metodologia Aplicada**

#### **Fase 1: Análise e Planejamento**
1. **Auditoria Completa**: Identificação de todos os code smells
2. **Mapeamento de Dependências**: Análise de acoplamento entre módulos
3. **Definição de Arquitetura**: Estabelecimento de padrões e convenções

#### **Fase 2: Refatoração Estrutural**
1. **Criação de Camadas de Abstração**
2. **Implementação de Padrões de Design**
3. **Centralização de Responsabilidades**

#### **Fase 3: Implementação de Testes**
1. **Setup de Ambiente de Testes**
2. **Testes Unitários para Funções Críticas**
3. **Mocks e Fixtures**

#### **Fase 4: Otimização e Documentação**
1. **Performance e Bundle Size**
2. **Documentação Técnica**
3. **Guias de Contribuição**

### 🏗️ **Padrões Arquiteturais Implementados**

#### **1. Custom Hooks Pattern**
```typescript
// Antes: Lógica espalhada
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
// ... código repetido em cada componente

// Depois: Hook reutilizável
const { loading, error, executeRequest } = useApiRequest({
  onSuccess: (data) => setUserData(data),
  showSuccessToast: true
})
```

#### **2. Service Layer Pattern**
```typescript
// Centralização de lógica de negócio
export const userService = {
  async getUserInfo() { /* ... */ },
  async updateUser(data) { /* ... */ },
  async deleteUser() { /* ... */ }
}
```

#### **3. Constants Centralization**
```typescript
// Configurações centralizadas
export const API_ENDPOINTS = {
  AUTH: { LOGIN: "/auth/login" },
  USER: { INFO: "/user/info" }
} as const
```

#### **4. Component Composition**
```typescript
// Componentes reutilizáveis e composáveis
<Avatar username={user.name} size={48} />
<LevelBadge level={user.level} onPress={showDetails} />
<LoadingSpinner fullScreen />
```

---

## 🧪 Testes Implementados

### 🔬 **Tipos de Testes**

#### **1. Testes de Serviços**
```typescript
describe("authService", () => {
  it("should login successfully with valid credentials", async () => {
    const credentials = { email: "test@example.com", password: "123" }
    const result = await authService.login(credentials)
    
    expect(result.token).toBeDefined()
    expect(result.user).toBeDefined()
  })
})
```

#### **2. Testes de Hooks**
```typescript
describe("useApiRequest", () => {
  it("should handle successful request", async () => {
    const { result } = renderHook(() => useApiRequest())
    
    await act(async () => {
      await result.current.executeRequest(mockRequest)
    })
    
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })
})
```

#### **3. Testes de Utilitários**
```typescript
describe("validators", () => {
  it("should validate email correctly", () => {
    expect(validateEmail("test@example.com")).toBeUndefined()
    expect(validateEmail("invalid")).toBe("Email inválido")
  })
})
```

#### **4. Testes de Componentes**
```typescript
describe("Avatar", () => {
  it("should render with correct size", () => {
    const { getByTestId } = render(<Avatar username="test" size={64} />)
    const avatar = getByTestId("avatar")
    
    expect(avatar.props.style.width).toBe(64)
    expect(avatar.props.style.height).toBe(64)
  })
})
```

### 🛠️ **Configuração de Testes**

#### **Setup e Mocks**
- **Jest Configuration**: Configuração otimizada para React Native
- **Testing Library**: Testes focados no comportamento do usuário
- **Mocks Globais**: AsyncStorage, Navigation, APIs
- **Coverage Reports**: Relatórios detalhados de cobertura

---

## 🔗 Interface Fluente (Planejada)

### 🎯 **Conceito e Benefícios**

A **Interface Fluente** será implementada para criar APIs mais expressivas e legíveis, seguindo o padrão de method chaining.

#### **Exemplo de API Fluente Planejada**

- **Yup**: Uso do yup para a validação de campos de formulários.

```
// Exemplo de uso do Yup
const schema = Yup.object().shape({
  email: Yup.string()
    .required('Email obrigatório!')
    .email(),
  password: Yup.string()
    .required('Senha obrigatória')
    .min(8, 'Senha inválida')
    .max(8, 'Senha inválida'),
});

```


#### **Benefícios da Interface Fluente**
- **Legibilidade**: Código mais expressivo e autodocumentado
- **Flexibilidade**: Configuração dinâmica e modular
- **Reutilização**: Padrões consistentes em toda a aplicação

---

## 🚀 Instalação e Execução

### 📋 **Pré-requisitos**

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 ou **yarn** >= 1.22.0
- **Expo CLI** >= 6.0.0
- **React Native CLI** (para desenvolvimento nativo)

### 🔧 **Instalação**

#### **1. Clone o Repositório**
```bash
git clone https://github.com/seu-usuario/fittrack-app.git
cd fittrack-app
```

#### **2. Instale as Dependências**
```bash
# Com npm
npm install

# Com yarn
yarn install
```

### ▶️ **Execução**

#### **Desenvolvimento**
```bash
# Inicie o servidor de desenvolvimento
npm start
# ou
yarn start

# Para plataformas específicas
npm run android    # Android
npm run ios        # iOS
npm run web        # Web
```

#### **Testes**
```bash
# Execute todos os testes
npm test

# Com yarn
yarn test
```

### 📱 **Executando no Dispositivo**

#### **Android**
1. Ative o modo desenvolvedor no dispositivo
2. Conecte via USB ou use emulador
3. Execute `npm run android`

#### **iOS**
1. Abra o Xcode
2. Configure certificados de desenvolvedor
3. Execute `npm run ios`

#### **Expo Go**
1. Instale o Expo Go no dispositivo
2. Escaneie o QR code gerado por `npm start`

---

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── Form/            # Componentes de formulário
│   ├── Others/          # Componentes diversos
│   └── UI/              # Componentes de interface
├── constants/           # Constantes da aplicação
├── context/            # Contextos React
│   ├── Auth/           # Contexto de autenticação
│   └── Theme/          # Contexto de tema
├── hooks/              # Custom hooks
│   ├── useApiRequest.ts # Hook para requisições
│   └── useUserData.ts  # Hook para dados do usuário
├── infra/              # Infraestrutura
│   ├── api.ts          # Cliente HTTP base
│   └── apiAuth.ts      # Cliente HTTP autenticado
├── routes/             # Configuração de rotas
├── screens/            # Telas da aplicação
├── services/           # Camada de serviços
│   ├── authService.ts  # Serviços de autenticação
│   └── userService.ts  # Serviços de usuário
├── utils/              # Utilitários
│   ├── formatters.ts   # Funções de formatação
│   ├── validators.ts   # Funções de validação
│   ├── functions.ts    # Funções auxiliares
|   ├── api.ts          # Endpoints e configurações de API
│   ├── ui.ts           # Constantes de interface
│   └── validation.ts   # Padrões de validação
└── __tests__/          # Testes automatizados
```

---

### 🔍 **Padrões de Código**

- **ESLint**: Configuração strict para qualidade de código
- **Prettier**: Formatação automática
- **TypeScript**: Tipagem forte obrigatória
- **Conventional Commits**: Padrão de mensagens de commit

### 🧪 **Requisitos para PR**

- ✅ Todos os testes passando
- ✅ Sem erros de lint
- ✅ Documentação atualizada

---

## 👥 Equipe

- **Desenvolvedores**: Jean Nesi e Kauã Librelato

---

<div align="center">
  <p>Feito com ❤️ pela equipe FitTrack</p>
  <p>© 2025 FitTrack. Todos os direitos reservados.</p>
</div>
