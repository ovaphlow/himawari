export default function useAuth() {
  return window.sessionStorage.getItem('auth');
}
