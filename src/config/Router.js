import { Route, Switch } from 'react-router-dom';
import Catalog from '../pages/Catalog.js';
import Detail from '../pages/detail/Detail.js';

import Home from '../pages/Home.js';
// import Catalog from '../pages/Catalog';
// import Detail from '../pages/detail/Detail';

const Routes = () =>{
    return(
        <Switch>
            <Route
                path='/:category/search/:keyword'
                component={Catalog}
            />
            {/* banner 'watch now' */}
            <Route
                path='/:category/:id'
                component={Detail} 
            />
            {/* banner 'viewmore' */}
            <Route
                path='/:category'
                component={Catalog}
            />
            <Route
                path='/'
                exact
                component={Home}
            />

        </Switch>
    )
}
export default Routes;