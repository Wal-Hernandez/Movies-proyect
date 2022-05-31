const API = "https://api.themoviedb.org/3";
export function get(path) {
  return fetch(API + path, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yzc0NTI5YWMxMzNlYmFmYzUwYzkxYWQ4NjUzNTBmYyIsInN1YiI6IjYyMWU3YjVmM2FjZDIwMDAxODI3M2ViYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aD-nmtJlNhqrV3UleP9U9RRLJvFzS0iuVHxADsdpm6o",
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((result) => result.json());
}
