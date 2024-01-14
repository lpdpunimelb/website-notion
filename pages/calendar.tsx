import Head from "next/head";

export default function Calendar() {
  return (
    <div>
      <Head>
        <title>LuNA Event Calendar</title>
      </Head>
      <iframe
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          padding: 16,
        }}
        src="https://calendar.google.com/calendar/embed?src=91824b00d58aba5fdf7aaaca3e87242ce6250f488897fe6a8547e4f8e4208e80%40group.calendar.google.com&ctz=Australia%2FMelbourne"
      ></iframe>
    </div>
  );
}
