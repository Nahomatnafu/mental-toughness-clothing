# Inherited tokens — from the MILLZ Global Solutions build

Distilled from `reference/DECISIONS.md` so the build does not have to re-derive
them from 24k of prose. **`DECISIONS.md` remains authoritative** — read §2, §2.1,
§2.2 and §3 there before overriding anything here.

---

## The red — and which direction the dependency runs

`#9C2736` was sampled from `assets/red-hoodie-front.jpg`, mid-chest, with a
script. It is a **Mental Toughness colour that the parent site borrowed**, not a
parent colour being handed down.

Parent `DECISIONS.md` §2.1 records this explicitly: *"if the client ever rebrands
one business and not the other, the apparel brand is the one with the stronger
claim to keep `#9C2736`, because its inventory is dyed that colour."*

Practical effect for this build: **use it exactly**, and treat it as native
rather than inherited. The sampled range across the garment is:

| Stop | Hex | Where on the garment |
|---|---|---|
| Shadow | `#8A1C26` | Folds |
| **Canonical** | **`#9C2736`** | Mid-chest — this is the brand red |
| Lit | `#BA3E52` | Highlight |

## Contrast — the parent already solved this build's hardest problem

The spec warns that *"red on black frequently fails contrast."* It does, and the
parent build measured it:

| Token | Hex | Use | Measured |
|---|---|---|---|
| `brick` | `#9C2736` | **Fill only** on dark. Solid block, light text on top. | 2.54:1 on ink ❌ as text |
| `ember` | `#D85A45` | **Red text on dark.** `brick` pulled toward the merch orange. | 5.04:1 on ink ✅ AA |
| `ink` | `#0E0D12` | Dark surface | 15.7:1 vs paper |
| `bone` | `#A8A29B` | Secondary text on dark | 7.66:1 ✅ |

This site is black-dominant, so `ember` will carry far more of the load here than
it did on the parent. The rule that makes it work: **components never choose
between the two reds.** A section declares its surface and the correct stop
resolves through `--accent` / `--accent-fill`. Copy that mechanism.

The spec asks for both values documented as separate tokens — they already are.

## Type

| Role | Parent used | This build |
|---|---|---|
| Display | **Archivo** (variable `wdth` axis, set expanded) | **Must differ.** Spec: sibling brands, not clones. |
| Body | **Literata** (variable `wght` + `opsz`) | **Share it.** Spec is explicit. |
| Utility | **IBM Plex Mono** 500 — eyebrows, prices | Available; reads as spec sheet, not gym |

Banned by the spec: Inter, Roboto, Arial, Space Grotesk, Poppins, Montserrat,
Bebas Neue, Oswald, Anton. The parent used none of them.

The parent's risk was **expanded** type where the industry uses condensed (§4).
The spec pushes the same way here — *"a wide or unusually-proportioned face would
be more interesting than another condensed one."* Going wide again is coherent
across the two sites, but it is then **not this build's one real risk**. Take the
risk somewhere else and log it.

`assets/Athelas Regular/` is present but the parent **dropped Athelas** — see
§3.1, it failed reversed on dark. This site is black-dominant. Do not reach for
it without re-testing.

## Orange

`#FE732E` is genuinely present in the merchandise. The parent excluded it from
the UI to protect single-accent discipline (§2.3) and allowed it **inside
photographs only**. The spec here invites *"one unexpected tertiary used in a
single place"* — if that tertiary is the merch orange, it is defensible. Log it.

## What is NOT inherited

Motion budget, the spine element (§5), and the globe are parent-specific. The
spec calls for a different signature element expressing *continuing under load* —
and rules out the obvious ones (heartbeat line, mountain).
