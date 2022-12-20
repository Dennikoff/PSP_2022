import {useRoutes} from "react-router-dom";
import {publicRoutes} from "../../rotes/rotes";

const PublicRouter = () => {
    const pubRoutes = useRoutes(publicRoutes)
    return (
        <div style={{"width": "100%"}}>
        {pubRoutes}
        </div>
    )
};

export default PublicRouter;