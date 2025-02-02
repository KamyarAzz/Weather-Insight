type Props = {averages: {day: string; averageHumidity: number}};

export default function HumidityView({averages}: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h4 className="text-base">{averages.day}</h4>
      <div className="relative w-10 h-10">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 522"
        >
          <defs>
            <clipPath id="clipDrop">
              <path d="M192 512C86 522 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0l1.8 0c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z" />
            </clipPath>
          </defs>
          <rect
            x="0"
            y={`${522 - (522 * averages.averageHumidity) / 100}`}
            width="382"
            height={`${(522 * averages.averageHumidity) / 100}`}
            fill="blue"
            clipPath="url(#clipDrop)"
            opacity="0.6"
          />
        </svg>
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 522"
        >
          <path
            d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0l1.8 0c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"
            fill="none"
            stroke="black"
            strokeWidth="22"
          />
        </svg>
      </div>
      <p className="text-sm">{averages.averageHumidity}%</p>
    </div>
  );
}
