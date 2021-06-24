type LangStringsType = {
  [language: string]: {
    [word: string]: string;
  };
};

export const LangStrings: LangStringsType = {
  pt: {
    clickHere: 'Clique aqui',
    createARoom: 'Criar uma nova sala',
    createRoom: 'Criar sala',
    enter: 'Entrar na sala',
    gbutton: 'Crie sua sala com o Google',
    homesub: 'Tire dúvidas de sua audiência em tempo real',
    hometitle: 'Crie salas de Q&A ao vivo',
    newRoomPhrase: 'Quer entrar em uma sala existente?',
    questionPhrase: 'O que deseja perguntar?',
    questionInstruction: 'Para enviar uma pergunta',
    question: 'pergunta',
    room: 'Sala',
    roomInput: 'Digite o código da sala',
    roomName: 'Nome da sala',
    send: 'Enviar',
    separator: 'ou entre em uma sala',
    signIn: 'faça seu login',
  },
  en: {
    clickHere: 'Click here',
    createARoom: 'Create a new room',
    createRoom: 'Create room',
    enter: 'Enter room',
    gbutton: 'Create a new room with Google',
    homesub: 'Clear doubts of your audience in real time',
    hometitle: 'Create live Q&A rooms',
    newRoomPhrase: 'Want to enter another room?',
    questionPhrase: 'What do you want to ask?',
    questionInstruction: 'To make a question',
    question: 'question',
    room: 'Room',
    roomInput: 'Write the room code',
    roomName: 'Room name',
    send: 'Send',
    signIn: 'sign in',
    separator: 'or enter a room',
  },
};
