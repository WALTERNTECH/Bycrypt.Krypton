# Database

Schema lives in Supabase's own migration history for project
`yzpkayxpllxqgdcmyvhh`, applied as five consolidated migrations:

| Migration | What it establishes |
| --- | --- |
| `bycrypt_init` | Tables, seed reference data, profile bootstrap trigger |
| `bycrypt_rls_jobs_and_transaction_key` | RLS policies, maturity cron, transaction-key hash |
| `bycrypt_wallet_kyc_buy_flow` | Wallet balance, KYC gating + bucket, `buy_investment` |
| `bycrypt_referrals_flexible_tier_withdrawals` | Referrals, 7-day tier, `request_withdrawal` |
| `bycrypt_atomic_money_functions` | `confirm_deposit`, `cash_out_investment`, `set_wallet_balance`, `secure_config` |

No `.sql` files are kept here. The sibling platform carried three partial
files that had drifted badly out of date — migrations applied through the
dashboard/API never reached them, so anyone trusting the folder would
have rebuilt a schema missing every atomic money function. Rather than
repeat that, the database's own history is the single source of truth;
`list_migrations` shows exactly what is applied.

## Rules that matter

Anything that moves a balance runs inside one Postgres function, never a
sequence of client calls — an interrupted two-step once left a deposit
marked confirmed with the wallet never credited.

`cash_out_investment` takes the market profit as a parameter computed
**server-side** by the cash-out route. It is never accepted from the
browser; a client-supplied figure would let anyone mint balance.

`secure_config` has RLS enabled with **no policies**, so anon and
authenticated reads are both denied and only the service role reaches
it. Mail credentials belong there. `platform_config` is world-readable by
design — never put a secret in it.
