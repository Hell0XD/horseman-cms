import React from "react";
import DarkPanel from "../components/DarkPanel";
import Panel from "../components/Panel";

import { Switch, Route, Link, useRouteMatch, useLocation, Redirect, useHistory } from "react-router-dom";
import Posts from "../screens/Posts";
import ColoredPanel from "../components/ColoredPanel";
import Categories from "../screens/Categories";

interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    to: string;
    path: string;
}

function MenuItem({ name, to, path, ...rest }: MenuItemProps) {
    const location = useLocation();
    return (
        <Link to={to}><div className={(location.pathname.split("/").pop() === path ? "text-[#000000]" : "text-[#737373]") + " text-[1.125rem] py-[0.5rem] px-[0.25rem]"}  {...rest}>{name}</div></Link>
    );
}

export default function CMS() {

    const history = useHistory();
    const { path, url } = useRouteMatch();

    const items = [
        {
            name: "Posts",
            path: "posts",
            component: <Posts />
        },
        {
            name: "Categories",
            path: "categories",
            component: <Categories />
        }
    ];

    return (
        <>
            <div className="flex h-full">
                <div className="w-[15rem] h-full relative">
                    <DarkPanel className="absolute top-[50%] ml-[2.5rem] -translate-y-1/2 h-[90%] flex flex-col">
                        <Panel className="py-[0.75rem] px-[1rem] rounded-b-none text-center text-eagle-green text-[1.25rem] font-bold">
                            <Link to="/"><h1>Horseman CMS</h1></Link>
                        </Panel>
                        <div className="flex-1 flex flex-col justify-between ">
                            <div className="px-[1rem]">
                                {items
                                    .map((item) => <MenuItem
                                        key={item.path}
                                        path={item.path}
                                        to={`${url}/${item.path}`}
                                        name={item.name}
                                    />)
                                    .map((el, i, { length }) => <React.Fragment key={i}>{el}{i === length - 1 ? "" : <div key={i} className="h-[2px] w-full bg-white"></div>}</React.Fragment>)
                                }
                            </div>
                            <ColoredPanel onClick={() => history.push("/")} className="flex items-center cursor-pointer mb-[1rem] mx-auto w-min text-white py-[0.5rem] px-[2.75rem]" color1="#FF6A8E" color2="#EF476F">
                                Logout
                            </ColoredPanel>
                        </div>
                    </DarkPanel>
                </div>
                <div className="flex-1 h-full">
                    <Switch>
                        {items.map((item) =>
                            <Route key={item.path} exact path={`${path}/${item.path}`}>
                                {item.component}
                            </Route>
                        )}
                        <Route path={`${path}`}>
                            <Redirect to={`${path}/${items[0].path}`} />
                        </Route>
                    </Switch>
                </div>
            </div>
        </>
    );
}