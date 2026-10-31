import { toolsNamed } from '@/lib/expertise';

export default function ToolChips({ names }: { names: string[] }) {
  return (
    <ul className="tool-chips">
      {toolsNamed(names).map(({ name, icon: Icon }) => <li key={name}><Icon aria-hidden="true" /> {name}</li>)}
    </ul>
  );
}
