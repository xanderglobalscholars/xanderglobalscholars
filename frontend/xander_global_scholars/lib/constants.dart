class APIConstants {
  // Base API URL
  static const String baseUrl = "http://localhost:5000";

  // Endpoints
  static const String loginEndpoint = "/api/auth/login";
  static const String registerEndpoint = "/api/auth/register";
  static const String userProfileEndpoint = "/api/users/profile";

  // GraphQL endpoint
  static const String graphqlEndpoint = "/graphql";

  // Headers
  static const Map<String, String> headers = {
    'Content-Type': 'application/json',
  };

  // Firebase API Key (if needed)
  static const String firebaseApiKey = "<YOUR_FIREBASE_API_KEY>";
}
