import React, { Dispatch, FC, Fragment, SetStateAction } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export interface IAlarmModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AlarmModal: FC<IAlarmModalProps> = ({ isOpen, setIsOpen }) => (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsOpen(false)}
        >
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-90" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-2xl font-medium leading-6 text-base-content"
                            >
                                🚨 Alarm On
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-accent-content">
                                    Time is still running in the background.
                                    You&apos;re free to continue using the
                                    stopwatch or stop the timer right away.
                                </p>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="btn-secondary btn inline-flex justify-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Got it, thanks!
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
);

export default AlarmModal;
