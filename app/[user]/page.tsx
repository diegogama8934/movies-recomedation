"use client"
import { useEffect, useState } from 'react';
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';

interface MovieFromApi {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  title: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface Movie {
  id: string
  title: string
  overview: string
  genders: number[]
  rate: number
}

const genderReference = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

export default function Page({ params }: { params: { user: String } }) {
  const [movies, setMovies] = useState<Movie[]>();

  // const handle

  const handleShowGender = (genderId: number): string => {
    const gender = genderReference.find(element => element.id == genderId);
    if (gender) {
      return gender.name;
    } else {
      return "Unknow";
    }
  }

  const handleGetWeekMovies = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2M0YTBjZmEyNzliYTllNDRiMDEzYzAxMDUwNmRjMCIsInN1YiI6IjY2NGUzODc0OGFkYWU0NmRiYzYzOWJiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8dcIcGhbV8nEJfxlOiXYhzTAkaYn6ZkcZoiVb6i0QtM'
      }
    };

    const resBody = await fetch('https://api.themoviedb.org/3/movie/823464/recommendations', options)
      .then(response => response.json())
      .catch(err => console.error(err));

    const moviesObtained = resBody.results.map((movieResult: MovieFromApi) => {
      const movieInfo = {
        id: movieResult.id,
        title: movieResult.title,
        overview: movieResult.overview,
        genders: movieResult.genre_ids,
        rate: 0
      }
      return movieInfo;
    });

    setMovies(moviesObtained);
  }

  useEffect(() => {
    handleGetWeekMovies();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-6xl mb-8">Hola <span className="capitalize">{params.user}</span>!</h1>
      <div className="w-full flex flex-wrap gap-8">
        {
          movies ? (
            movies.map((movie) => (
              <div className="w-80 p-4 bg-content1 rounded-md flex flex-col justify-between gap-4" key={movie.id}>
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl">{movie.title}</h3>
                  <p>{movie.overview}</p>
                  <div className="flex flex-wrap gap-2">
                    {
                      movie.genders.map((gender, index) => (
                        <Chip key={index}>
                          {handleShowGender(gender)}
                        </Chip>
                      ))
                    }
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {movie.rate.toString()}
                    <span className="material-symbols-rounded !text-yellow-400">star</span>
                  </div>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button>Calificación</Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Selección de peliculas para recomendaciones"
                      onAction={(key) => {
                        const newMovies = [...movies];
                        newMovies.find((element, index, movies) => {
                          if (element.id == movie.id) {
                            newMovies[index].rate = key;
                          }
                        })
                        setMovies(newMovies);
                      }}
                    >
                      <DropdownItem key={1}>No es de mis gustos</DropdownItem>
                      <DropdownItem key={2}>Casi no me gusta</DropdownItem>
                      <DropdownItem key={3}>Regular</DropdownItem>
                      <DropdownItem key={4}>Me entretiene</DropdownItem>
                      <DropdownItem key={5}>De mis peliculas favoritas</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            ))
          ) : (
            <h2 className='text-3xl'>Cargando...</h2>
          )
        }
      </div>
    </div>
  );
}