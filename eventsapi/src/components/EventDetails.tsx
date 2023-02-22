import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardLink, CardText, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import {GetEventById} from '../services/EventsServices';
import {AnEvent} from "../model/Events";

export function EventDetails () {
  const {id} = useParams<{id:string}>();

  const [detailsRoute, setDetailsRoute] = useState<AnEvent | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      const response = await GetEventById(id ?? "");
      setDetailsRoute(response.data)
    
    }
    fetchEvent()
  }, [id]);

 

  return (
    <div className="DetailsRoute">
      {detailsRoute !==null ? (
        <Row>
          <Col>
                <Card>
                {detailsRoute.images[0] && (
                  <img
                    src={detailsRoute.images[0].url}
                    alt="Event"
                    style={{ height: "300px", width: "50vw" }}
                  />
                )}
                <CardBody>
                  <CardTitle tag="h5">{detailsRoute.name}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {detailsRoute.dates.start.localDate}
                  </CardSubtitle>
                  <CardLink href={detailsRoute.url} target="_blank">
                    Buy Tickets
                  </CardLink>
                  <CardText>{detailsRoute?._embedded?.venues[0]?.name}</CardText>
                  </CardBody>
                  <p><b>Genre: </b>{detailsRoute?.classifications[0]?.genre.name}</p>
                  <p><b>Venue: </b>{detailsRoute?._embedded?.venues[0]?.address?.line1} </p>
                  <p><b>City: </b>{detailsRoute?._embedded?.venues[0]?.city.name}</p>
                  <p><b>State: </b>{detailsRoute?._embedded?.venues[0]?.state.name}</p>
                  <p><b>Postal Code: </b>{detailsRoute?._embedded?.venues[0]?.postalCode}</p>
              </Card>
              </Col>
              </Row>
      ):(
        <h1>holding</h1>
      )
      }
    </div>
  );
}