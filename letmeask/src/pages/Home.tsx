import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import { LanguageSelector } from '../components/LanguageSelector';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { database } from '../services/firebase';
import useTranslation from '../hooks/useTranslation';

export function Home() {
  const history = useHistory();
  const { t } = useTranslation();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('A sala não existe!');
      return;
    }

    if (roomRef.val().closedAt) {
      alert('A sala está fechada!');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <LanguageSelector />
        <img src={illustrationImg} alt="Ilustração: perguntas e respostas" />
        <strong>{t('hometitle')}</strong>
        <p>{t('homesub')}</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleImg} alt="Google" />
            {t('gbutton')}
          </button>
          <div className="separator">{t('separator')}</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder={t('roomInput')}
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">{t('enter')}</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
