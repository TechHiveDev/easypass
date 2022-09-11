import LoadingScreen from "./Loading.screen";
import ErrorScreen from "./Error.screen";

// =====================================================

export default function LoadingOrErrorScreen({
  isLoading = false,
  isFetching = false,
  error = "",
}) {
  // ---------------------------------

  if (isLoading || isFetching) return <LoadingScreen />;

  // ---------------------------------

  if (error) return <ErrorScreen error={error} />;

  // ---------------------------------

  return null;
}

// =====================================================
