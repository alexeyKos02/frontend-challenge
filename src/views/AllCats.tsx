import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useAppDispatch, useAppRootState } from "../store";
import { useEffect, useRef, useState } from "react";
import { fetchAllCats, fetchFavoriteCats } from "../store/catsSlice";
import "../styles/views/AllCats.scss";
import { increasePaginationPage } from "../store/renderSlice";
import { Form, Spinner } from "react-bootstrap";
import { Cat } from "../types/cats";
import emptyHeart from "../assets/emptyHeart.svg";
import fullHeat from "../assets/fullHeart.svg";
import { useLocation } from "react-router-dom";
import PaginationComponent from "../components/PaginationComponent";
import { IMG_PER_PAGE } from "../consts";

function AllCats() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { cats, favoriteCats, loadingFirst, loadingSecond } = useAppRootState(
    (state) => state.cats,
  );

  const containerRef = useRef(null);
  const [isBottom, setIsBottom] = useState(false);
  const [withPag, setWithPag] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [maxPage, setMaxPage] = useState(0);
  const { paginationPage } = useAppRootState((state) => state.render);

  const [actualCats, setActualCats] = useState<Cat[]>([]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        if (!withPag) {
          setIsBottom(true);
        }
      } else {
        setIsBottom(false);
      }
    }
  };

  function setPage(page: number) {
    dispatch(increasePaginationPage(page));
  }

  function likeCat(id: string) {
    if (!favorites.includes(id)) {
      const updatedCats = actualCats.map((cat) =>
        cat.id === id ? { ...cat, liked: true } : cat,
      );
      setActualCats(updatedCats);
      setFavorites((prevFavorites: string[]) => [...prevFavorites, id]);
    } else {
      const updatedCats = actualCats.filter((cat) => cat.id !== id);
      setActualCats(updatedCats);
      setFavorites(favorites.filter((catID) => catID !== id));
    }
  }

  useEffect(() => {
    if (location.pathname === "/favorites") {
      setLoading(loadingSecond);
    } else {
      setLoading(loadingFirst);
    }
  }, [loadingFirst, loadingSecond, location]);

  const changePagination = () => {
    setWithPag(!withPag);
  };

  useEffect(() => {
    if (location.pathname === "/favorites") {
      setMaxPage(Math.ceil(favorites.length / IMG_PER_PAGE));
    } else {
      setMaxPage(0);
    }
    console.log("alexx");
    dispatch(increasePaginationPage(1));
  }, [location, favorites]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const loadCats = async () => {
      if (maxPage) {
        if (maxPage < paginationPage) {
          return;
        }
      }
      try {
        if (location.pathname === "/favorites") {
          const startIndex = (paginationPage - 1) * IMG_PER_PAGE;
          const endIndex = startIndex + IMG_PER_PAGE;
          const paginatedCats = favorites.slice(startIndex, endIndex);
          await dispatch(fetchFavoriteCats(paginatedCats));
        } else {
          await dispatch(fetchAllCats({ page: paginationPage }));
        }
      } catch (error) {
        console.error("Ошибка при загрузке котов:", error);
      }
    };

    loadCats();
  }, [paginationPage, location]);

  useEffect(() => {
    if (location.pathname === "/favorites") {
      if (withPag) {
        setActualCats(favoriteCats);
      } else {
        setActualCats([...actualCats, ...favoriteCats]);
      }
    } else {
      if (withPag) {
        setActualCats(cats);
      } else {
        setActualCats([...actualCats, ...cats]);
      }
    }
  }, [cats, favoriteCats, location]);

  useEffect(() => {
    if (isBottom) {
      setPage(paginationPage + 1);
    }
  }, [isBottom]);

  return (
    <>
      <div className="type-selector">
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Пагинация"
          checked={withPag}
          onChange={changePagination}
        />
      </div>
      <div className="cats-item" ref={containerRef} onScroll={handleScroll}>
        {loading && <Spinner animation="border" className="spinner" />}
        {!loading && actualCats.length <= 0 && (
          <span className="center-text">Пусто</span>
        )}
        {(!withPag || (withPag && !loading)) && (
          <Row xs={3} md={5} className="g-4">
            {actualCats.map((cat) => (
              <Col key={cat.id}>
                <Card className="card">
                  <Card.Img
                    variant="top"
                    src={cat.url}
                    className="fixed-image"
                  />
                  <div className="icon-wrapper" onClick={() => likeCat(cat.id)}>
                    {cat.liked ? (
                      <img alt="full heart" src={fullHeat} className="icon" />
                    ) : (
                      <img
                        alt="empty heart"
                        src={emptyHeart}
                        className="icon"
                      />
                    )}
                    <img
                      alt="full heart"
                      src={fullHeat}
                      className="icon__full"
                    />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
      {actualCats.length > 0 && (
        <div>
          {!withPag && loading && (
            <div className="loader">
              <Spinner animation="border" className="spinner" />
              Загрузка котиков
            </div>
          )}
          {withPag && (
            <PaginationComponent count={maxPage ? maxPage : undefined} />
          )}
        </div>
      )}
    </>
  );
}

export default AllCats;
