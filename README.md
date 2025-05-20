# FitTrack

O FitTrack App é uma aplicação projetada para ajudar os usuários a acompanhar seus treinos, definir metas de fitness e alcançar seus objetivos de forma eficaz. Com recursos abrangentes e uma interface intuitiva, o aplicativo oferece uma experiência personalizada para cada usuário.

## Participantes
- [Kauã Librelato da Costa](https://www.github.com/KauaLibrelato)(KauaLibrelato e kaua.librelato)
- [Jean Carlos Nesi](https://www.github.com/JeanNesi)
- [Kauan Laureano Cândido](https://www.github.com/kauanlc1)
- [Lucas Ribeiro Guidi](https://www.github.com/lucasrguidi)
- [João Victor Miotelli Vitali](https://www.github.com/JoaoMiotelli)

## Funcionalidades Principais

- Acompanhamento de Treino: Registre e acompanhe seus treinos diários.
- Amizade: Faça amizades dentro app.
- Missões e Níveis: Complete missões de fitness para ganhar pontos de experiência (XP) e subir de nível, mantendo-se motivado e engajado.
- Ranking: Suba seu nível e compare com o ranking geral ou entre amigos.

## Tecnologias Principais

- React Native
- Expo
- Styled components
- Axios
- React Navigation


## Instalação
Para utilizar o app FitTrack em sua máquina é fácil e rápido, somente seguir os passos abaixo.

1- Clone este repositório para o seu ambiente local:
```
git clone https://github.com/KauaLibrelato/FitTrack-App.git
```

2- Instale as dependências necessárias:
```
yarn
```

3- Altere para seu ip os arquivos de apis(src/infra/api.ts e src/infra/apiAuth.ts)
(Para pegar o seu ip, abra o seu Prompt de Comando e utilize o comando ipconfig e copiar e colar seu Endereço IPv4)
```
const ip = "";
export const urlBackend = `http://${ip}:8080/api/client`;
```

3- Inicie o servidor de desenvolvimento:
```
yarn start
```

