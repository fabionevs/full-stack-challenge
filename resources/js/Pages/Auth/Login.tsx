import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // se você estiver usando Ziggy, pode trocar '/login' por route('login')
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Sign in" />

            <main className="main">
                {/* Se quiser, pode pôr o mesmo header da home aqui em cima */}

                <section className="section-box">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-5 col-lg-6 col-md-8">
                                <div className="text-center mb-40 mt-40">
                                    <a href="/" className="d-inline-block mb-3">
                                        <img
                                            src="/img/logo.png"
                                            alt="WiseJobs"
                                            style={{ height: 40 }}
                                        />
                                    </a>
                                    <h4>Welcome back 👋</h4>
                                    <p className="text-muted">
                                        Sign in to your account to manage jobs and companies.
                                    </p>
                                </div>

                                <div className="card border-0 box-shadow-2 radius-16 mb-40">
                                    <div className="card-body p-30">
                                        {status && (
                                            <div className="alert alert-success mb-3">
                                                {status}
                                            </div>
                                        )}

                                        <form onSubmit={submit} className="login-register text-start">
                                            {/* Email */}
                                            <div className="form-group mb-3">
                                                <label
                                                    htmlFor="email"
                                                    className="form-label"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    value={data.email}
                                                    className="form-control"
                                                    autoComplete="username"
                                                    autoFocus
                                                    onChange={(e) =>
                                                        setData('email', e.target.value)
                                                    }
                                                />
                                                <InputError
                                                    message={errors.email}
                                                    className="mt-1 text-danger"
                                                />
                                            </div>

                                            {/* Password */}
                                            <div className="form-group mb-3">
                                                <label
                                                    htmlFor="password"
                                                    className="form-label d-flex justify-content-between"
                                                >
                                                    <span>Password</span>
                                                    {canResetPassword && (
                                                        <Link
                                                            href="/forgot-password"
                                                            className="text-sm text-primary"
                                                        >
                                                            Forgot your password?
                                                        </Link>
                                                    )}
                                                </label>
                                                <input
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    value={data.password}
                                                    className="form-control"
                                                    autoComplete="current-password"
                                                    onChange={(e) =>
                                                        setData('password', e.target.value)
                                                    }
                                                />
                                                <InputError
                                                    message={errors.password}
                                                    className="mt-1 text-danger"
                                                />
                                            </div>

                                            {/* Remember me */}
                                            <div className="form-group mb-3">
                                                <div className="form-check">
                                                    <input
                                                        id="remember"
                                                        type="checkbox"
                                                        name="remember"
                                                        className="form-check-input"
                                                        checked={data.remember}
                                                        onChange={(e) =>
                                                            setData(
                                                                'remember',
                                                                e.target.checked ?? false,
                                                            )
                                                        }
                                                        style={{width: '10px', height: '20px'}}
                                                    />
                                                    <label
                                                        htmlFor="remember"
                                                        className="form-check-label"
                                                    >
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Erro global (se quiser) */}
                                            {errors.email === undefined &&
                                                errors.password === undefined &&
                                                errors[''] && (
                                                    <div className="alert alert-danger mb-3">
                                                        {errors['']}
                                                    </div>
                                                )}

                                            {/* Botão */}
                                            <div className="d-grid mt-3">
                                                <PrimaryButton
                                                    className="btn btn-primary btn-lg w-100"
                                                    disabled={processing}
                                                >
                                                    {processing ? 'Signing in...' : 'Sign in'}
                                                </PrimaryButton>
                                            </div>

                                            {/* Link opcional pra register, se quiser */}
                                            {/* 
                                            <div className="text-center mt-3">
                                                <span className="text-muted">
                                                    Don&apos;t have an account?{' '}
                                                </span>
                                                <Link href="/register" className="text-primary">
                                                    Sign up
                                                </Link>
                                            </div>
                                            */}
                                        </form>
                                    </div>
                                </div>

                                <div className="text-center mb-30 text-muted text-sm">
                                    © {new Date().getFullYear()} WiseJobs. All rights reserved.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
