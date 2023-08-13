import React from "react";

import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";

function Pagination({ links }) {
    return (
        <div className="flex items-center justify-end py-4 space-x-2">
            {links.map((item, index) => {
                return (
                    <Button
                        key={index}
                        variant={item.active ? "" : "outline"}
                        size="sm"
                        disabled={!item.url}
                        className="p-0"
                    >
                        <Link
                            href={item.url}
                            preserveScroll
                            preserveState
                            className="px-3"
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: item.label,
                                }}
                            />
                        </Link>
                    </Button>
                );
            })}
        </div>
    );
}

export default Pagination;
