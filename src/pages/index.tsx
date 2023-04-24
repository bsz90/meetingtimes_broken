import { useState } from "react";
import { AppSettings } from "./AppSettings";
import { Calendar } from "./Calendar";
import { defaultSettings } from "./constants";

export default function Home() {
  const [settings, setSettings] = useState(defaultSettings);
  return (
    <main className="flex min-h-screen flex-col items-center bg-white justify-center p-20 overflow-hidden">
      <AppSettings settings={settings} setSettings={setSettings} />
      <Calendar />
    </main>
  );
}
