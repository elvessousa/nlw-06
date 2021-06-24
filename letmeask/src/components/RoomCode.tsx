import copyImg from '../assets/images/copy.svg';
import useTranslation from '../hooks/useTranslation';
import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
};

export function RoomCode({ code }: RoomCodeProps) {
  const { t } = useTranslation();

  function copyCodeToClipboard() {
    if (navigator) {
      navigator.clipboard.writeText(code);
    }
  }

  return (
    <button className="room-code" onClick={copyCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copiar código" />
      </div>
      <span>
        {t('room')} {code}
      </span>
    </button>
  );
}
