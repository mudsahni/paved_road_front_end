import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {Dialog, DialogPanel, PopoverGroup} from "@headlessui/react";
import React, {useState} from "react";

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
          <header className="relative isolate z-10 bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Intuit</span>
                <img className="h-8 w-auto"
                     src="./intuit.png" alt=""/>

            </a>
        </div>
        <div className="flex lg:hidden">
            <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
            >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
            </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">

            <a href="/templates" className="text-sm font-semibold leading-6 text-gray-900">
                Templates
            </a>
            <a href="/projects" className="text-sm font-semibold leading-6 text-gray-900">
               Projects
            </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        </div>
    </nav>
            <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10"/>
        <DialogPanel
            className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
                <a href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Intuit</span>
                    <img
                        className="h-8 w-auto"
                        src="./intuit.png"
                        alt=""
                    />
                </a>
                <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                </button>
            </div>
            <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                        <a
                            href="/templates"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                            Templates
                        </a>
                        <a
                            href="/projects"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                           Projects
                        </a>
                    </div>
                </div>
            </div>
        </DialogPanel>
    </Dialog>
          </header>
    )
}