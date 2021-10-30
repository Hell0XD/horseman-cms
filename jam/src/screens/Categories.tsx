import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { apiDeleteCategory, apiGetCategories, apiNewCategory } from "../api/lib";
import ColoredPanel from "../components/ColoredPanel";
import DarkPanel from "../components/DarkPanel";
import Input from "../components/Input";
import Panel from "../components/Panel";


import { ReactComponent as AddCategory } from "../icons/AddCategory.svg"; 
import { ReactComponent as Close } from "../icons/Close.svg";
import { jwt_state } from "../state";

interface CategoryProps {
    name: string;
}

function Category({name}: CategoryProps) {
    return (
        <Panel className="flex items-center justify-between  mx-[1rem] mt-[1rem] text-[1.125rem] py-[0.5rem] px-[0.75rem]">
            <p className="ml-[0.5rem]">{name}</p>
            <ColoredPanel className="cursor-pointer flex items-center py-[0.5rem] px-[1.5rem]" color1="#FF6A8E" color2="#EF476F">
                <Close />
            </ColoredPanel>
        </Panel>
    );
}


export default function Categories() {
    const [categories, setCategories] = useState<Array<string>>([]);
    const [jwt] = useRecoilState(jwt_state);

    useEffect(() => {
        apiGetCategories()
            .then(cat => setCategories(cat))
            .catch(() => toast.error("Something went wrong while fetching data"));
    }, []);

    const [addCategory, setAddCategory] = useState("");
    
    return (
        <div className="h-full flex">
            <div className="flex-1 flex flex-col ml-[2rem] my-[3rem] mr-[3rem]">
                <div className="flex space-x-4">
                    <Input onChange={(e) => setAddCategory((e.target as any).value)} placeholder="Dogs and kittens.." className="flex-1" />
                    <ColoredPanel onClick={() => {
                        apiNewCategory(addCategory, jwt).then(() => {
                            categories.push(addCategory);
                            categories.sort();
                            setCategories(categories);
                            setAddCategory("");
                            toast.success("Added category");
                        }).catch(() => toast.error("Failed to add new category"));
                    }} className="cursor-pointer flex items-center px-[2rem]" color1="#17AFE1" color2="#118AB2">
                        <AddCategory />
                    </ColoredPanel>
                </div>

                {categories.map(cat => (
                    <DarkPanel onClick={() => {
                        apiDeleteCategory(cat, jwt).then(() => {
                            categories.splice(categories.indexOf(cat), 1);
                            setCategories(categories);
                            toast.success("Removed category");
                        }).catch(() => toast.error("Failed to delete category"));
                    }} key={cat} className="mt-[1rem] flex-1">
                        <Category name={cat} />
                    </DarkPanel>
                ))}
                
            </div>
        </div>
    );

}