export type NormalizedUser = {
 id: string;
 email: string | null | undefined;
 fullName: string | null;
 avatarUrl: string | null;
 provider: string | undefined;
};
