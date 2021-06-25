import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import { LanguageSelector } from '../components/LanguageSelector';
import useTranslation from '../hooks/useTranslation';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';

export function NewRoom() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <LanguageSelector />
        <img src={illustrationImg} alt="Q&A" />
        <strong>{t('hometitle')}</strong>
        <p>{t('homesub')}</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>{t('createARoom')}</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder={t('roomName')}
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">{t('createRoom')}</Button>
          </form>
          <p>
            {t('newRoomPhrase')} <Link to="/">{t('clickHere')}</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}
