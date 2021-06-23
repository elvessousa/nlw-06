import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
};

export function RoomCode({ code }: RoomCodeProps) {
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
      <span>Sala {code}</span>
    </button>
  );
}
