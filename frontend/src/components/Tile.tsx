type Props = {
  title: string;
  info: string | JSX.Element;
  description?: string;
};

const Tile = ({ title, info, description }: Props): JSX.Element => {
  return (
    <article className="w-[145px] h-[130px] text-zinc-700 bg-white/20 rounded p-2 mb-5 flex flex-col justify-between items-start font-medium py-3">
      <div className="flex items-center justify-start gap-2 font-bold">
        <p>{title}</p>
      </div>
      <p>{info}</p>
      <p className="text-sm text-left">{description}</p>
    </article>
  );
};

export default Tile;
