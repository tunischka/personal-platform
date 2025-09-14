type Props = {
  src: string;
  height?: number;
  className?: string;
};

export default function PDF({ src, height = 800, className = "border rounded" }: Props) {
  // object yerine iframe daha stabil
  return (
    <iframe
      src={`${src}#toolbar=0`}
      width="100%"
      height={height}
      className={className}
      loading="lazy"
      allow="fullscreen"
    />
  );
}
