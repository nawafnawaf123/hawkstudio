export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="route-transition" aria-hidden="true">
        <i /><i /><i /><i />
        <b>HAWK</b>
        <span>DESIGN × CODE × MOTION</span>
      </div>
      <div className="route-content">{children}</div>
    </>
  );
}
