import Layout from "../components/Layout";
import TrackForm from "../components/TrackForm";
import { useRouter } from "next/router";

export default function Upload({ toggleTheme, theme }) {
  const router = useRouter();

  const onSuccess = (track) => {
    router.push("/dashboard");
  };

  return (
    <Layout toggleTheme={toggleTheme} theme={theme}>
      <h2 className="text-2xl font-semibold mb-4">Upload Track</h2>
      <TrackForm onSuccess={onSuccess} />
    </Layout>
  );
}
