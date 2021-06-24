import { FormEvent, useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { LanguageSelector } from '../components/LanguageSelector';

import logoImg from '../assets/images/logo.svg';
import '../styles/room.scss';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import useTranslation from '../hooks/useTranslation';

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  }
>;

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

type RoomParams = {
  id: string;
};

export function Room() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomID = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomID}`);

    // Tip: child_added/changed/removed events for better performance
    roomRef.on('value', (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
          };
        }
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomID]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in.');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnwered: false,
    };

    await database.ref(`rooms/${roomID}/questions`).push(question);
    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomID} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>
            {t('room')}: {title}
          </h1>
          {questions.length > 0 && (
            <span>
              {questions.length} {t('question')}
              {questions.length === 1 ? '' : 's'}
            </span>
          )}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder={t('questionPhrase')}
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <footer className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                {t('questionInstruction')}, <button>{t('signIn')}</button>.
              </span>
            )}
            <Button type="submit" disabled={!user}>
              {t('send')}
            </Button>
          </footer>
        </form>

        {JSON.stringify(questions)}
      </main>
      <LanguageSelector />
    </div>
  );
}
