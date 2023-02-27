/* eslint-disable react/jsx-props-no-spreading */
import React, { Dispatch, FC, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { Timer } from '../types/timer';

export interface IAlarFormProps {
    setAlarm: Dispatch<SetStateAction<Timer>>;
}

const AlarmForm: FC<IAlarFormProps> = ({ setAlarm }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Timer>();
    const onSubmit = (data: Timer) => setAlarm(data);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-5 flex w-fit flex-col space-y-4 rounded-lg border-4 p-4"
        >
            <h2>Setup an alarm</h2>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">How many minutes?</span>
                </label>
                <input
                    type="number"
                    placeholder="Minutes"
                    defaultValue={0}
                    aria-invalid={errors.min ? 'true' : 'false'}
                    {...register('min', { required: true, min: 0 })}
                    className={`input-bordered input w-full max-w-xs focus:ring-secondary-focus ${
                        errors.min ? 'input-error' : ''
                    }`}
                />
                <label className="label">
                    {errors.min && (
                        <p className="label-text-alt text-error">
                            ⚠️ Invalid time value.
                        </p>
                    )}
                </label>
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">How many seconds?</span>
                </label>
                <input
                    type="number"
                    placeholder="Seconds"
                    defaultValue={0}
                    aria-invalid={errors.sec ? 'true' : 'false'}
                    {...register('sec', { required: true, min: 0, max: 59 })}
                    className={`input-bordered input w-full max-w-xs  focus:ring-secondary-focus ${
                        errors.sec ? 'input-error' : ''
                    }`}
                />
                <label className="label">
                    {errors.sec && (
                        <p className="label-text-alt text-error">
                            ⚠️ Invalid time value.
                        </p>
                    )}
                </label>
            </div>
            <input type="submit" className="btn btn-block" />
        </form>
    );
};

export default AlarmForm;
