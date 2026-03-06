import "../globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="container-x py-10">{children}</div>;
}
