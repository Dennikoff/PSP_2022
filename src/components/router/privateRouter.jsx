import {useRoutes} from "react-router-dom";
import {privateRoutes} from "../../rotes/rotes";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext";
import {storage} from "../../storage/storage";

const checkAuth = (authContext) => {
    if(!storage.get('isAuth')) {
        authContext.setIsAuth(false)
    }
}

const PrivateRouter = () => {
    const priRoutes = useRoutes(privateRoutes)
    checkAuth(useContext(AuthContext))
    return (
        <div style={{"width": "100%", "height": "auto"}}>
            {priRoutes}
        </div>
    );
};

export default PrivateRouter;