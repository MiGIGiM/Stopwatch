import React, { Dispatch, FC, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Timer } from '../types/timer';

export interface IAlarFormProps {
    setAlarm: Dispatch<SetStateAction<Timer>>;
}

const AlarmForm: FC<IAlarFormProps> = ({ setAlarm }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Timer>({
        defaultValues: {
            min: '0',
            sec: '0',
        },
    });

    const onSubmit: SubmitHandler<Timer> = (data: Timer) => setAlarm(data);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-5 flex w-fit flex-col space-y-4 rounded-lg border-4 p-4"
        >
            <h2>Setup an alarm</h2>
            <div className="form-control w-full max-w-xs">
                <span className="label">
                    <span className="label-text">How many minutes?</span>
                </span>
                <input
                    id="minutes_input"
                    type="number"
                    placeholder="Minutes"
                    aria-invalid={errors.min ? 'true' : 'false'}
                    {...register('min', { required: true, min: 0, value: 0 })}
                    className={`input-bordered input w-full max-w-xs focus:ring-secondary-focus ${
                        errors.min ? 'input-error' : ''
                    }`}
                />
                <label className="label" htmlFor="minutes_input">
                    {errors.min && (
                        <p className="label-text-alt text-error">
                            ⚠️ Invalid time value.
                        </p>
                    )}
                </label>
            </div>
            <div className="form-control w-full max-w-xs">
                <span className="label">
                    <span className="label-text">How many seconds?</span>
                </span>
                <input
                    id="seconds_input"
                    type="number"
                    placeholder="Seconds"
                    aria-invalid={errors.sec ? 'true' : 'false'}
                    {...register('sec', {
                        required: true,
                        min: 0,
                        max: 59,
                        value: 0,
                    })}
                    className={`input-bordered input w-full max-w-xs  focus:ring-secondary-focus ${
                        errors.sec ? 'input-error' : ''
                    }`}
                />
                <label className="label" htmlFor="seconds_input">
                    {errors.sec && (
                        <p className="label-text-alt text-error">
                            ⚠️ Invalid time value.
                        </p>
                    )}
                </label>
            </div>
            <input type="submit" className="btn-block btn" />
        </form>
    );
};

export default AlarmForm;
