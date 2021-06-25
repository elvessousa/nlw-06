import { useHistory, useParams } from 'react-router-dom';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { LanguageSelector } from '../components/LanguageSelector';

import useTranslation from '../hooks/useTranslation';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import '../styles/room.scss';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { t } = useTranslation();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomID = params.id;
  const { questions, title } = useRoom(roomID);

  async function handleCloseRoom() {
    await database.ref(`rooms/${roomID}`).update({
      closedAt: new Date(),
    });

    history.push('/');
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomID}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomID}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleDeleteQuestion(questionId: string) {
    if (!window) {
      return;
    }

    if (window.confirm(t('confirmation'))) {
      await database.ref(`rooms/${roomID}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomID} />
            <Button onClick={handleCloseRoom} isOutlined>
              {t('roomClose')}
            </Button>
          </div>
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

        <div className="question-list">
          {questions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt={t('markAnswered')} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerImg} alt={t('highlight')} />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt={t('deleteQuestion')} />
              </button>
            </Question>
          ))}
        </div>
      </main>
      <LanguageSelector />
    </div>
  );
}
