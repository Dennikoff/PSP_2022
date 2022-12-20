import {useRoutes} from "react-router-dom";
import {privateRoutes} from "../../rotes/rotes";

const PrivateRouter = () => {
    const priRoutes = useRoutes(privateRoutes)
    return (
        <div style={{"width": "100%", "height": "100vh"}}>
            {priRoutes}
        </div>
    );
};

export default PrivateRouter;