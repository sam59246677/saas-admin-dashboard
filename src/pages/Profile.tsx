function Profile() {
    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile </h1>
                <p className=" mt-2 text-slate-600 dark:text-slate-400">Manage your profile information.</p>
            </div>

            <div className="mt-6 max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-xl font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                        S
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Sam </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Administrator</p>
                    </div>
                </div>

                {/* Profile information */}
                <div className="mt-8 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300"> Name</label>
                        <input type="text" value="Sam" readOnly className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300"> Email</label>
                        <input type="email" value="admin@example.com" readOnly className=" mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Role</label>
                        <input type="text" value="Administrator" readOnly className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                    </div>

                </div>
            </div>
        </div>
    );
}
export default Profile;