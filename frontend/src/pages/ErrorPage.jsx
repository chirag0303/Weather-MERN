import MainNavigation from "../components/UI/MainNavigation";

const ErrorPage = () => {

    return <>
      <MainNavigation />
      <main>
        <h1>An error occurred</h1>
        <p>The requested page could not be found</p>
      </main>
    </>
};

export default ErrorPage;