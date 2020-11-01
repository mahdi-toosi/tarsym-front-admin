<template>
    <div class="checkbox-container">
        <input class="checkbox" type="checkbox" :checked="isChecked" />
        <div class="checkbox-visual" dir="ltr">
            <div></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isChecked: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style>
:root {
    --light-grey: hsl(218deg, 4%, 46%);
    --green: hsl(152deg, 45%, 48%);
}
.checkbox-container {
    display: grid;
    gap: 8px;
    grid-template-columns: max-content min-content;
    grid-template-rows: max-content;
    align-items: center;
    margin: 0 auto;
    width: 44px;
}

.checkbox-container > input,
.checkbox-container > div {
    grid-column: 2/3;
    grid-row: 1/2;
}

.checkbox {
    cursor: pointer;

    width: 100%;
    height: 100%;
    appearance: none;
    margin: 0;
    padding: 0;
}

.checkbox-visual {
    position: relative;
    background: var(--light-grey);
    transition: 0.3s cubic-bezier(0.83, 0, 0.17, 1);
    font-size: 1em;
    width: 2em;
    height: 1em;
    padding: 0.1em;
    border-radius: 9999px;
    pointer-events: none;
}

.checkbox:checked ~ .checkbox-visual {
    background: var(--green);
}

.checkbox ~ .checkbox-visual > div {
    position: relative;
    left: 0;
    height: 0.8em;
    width: 0.8em;
    background: white;
    pointer-events: none;
    transition: inherit;
    border-radius: 9999px;

    display: grid;
    justify-items: stretch;
    align-items: stretch;
    padding: 0.1em;
}

.checkbox:checked ~ .checkbox-visual > div {
    left: calc(100%);
    transform: translateX(-100%);
    background: white;
    display: grid;
}

.checkbox ~ .checkbox-visual > div:before,
.checkbox ~ .checkbox-visual > div:after {
    content: "";
    transition: inherit;
    background-color: var(--light-grey);
    grid-column: 1/2;
    grid-row: 1/2;
}

.checkbox:checked ~ .checkbox-visual > div:before,
.checkbox:checked ~ .checkbox-visual > div:after {
    background-color: var(--green);
}

.checkbox ~ .checkbox-visual > div:before {
    clip-path: polygon(20% 0%, 0% 20%, 80% 100%, 100% 80%);
}

.checkbox:checked ~ .checkbox-visual > div:before {
    clip-path: polygon(25% 75%, 33% 100%, 100% 20%, 80% 0%);
}

.checkbox ~ .checkbox-visual > div:after {
    clip-path: polygon(0% 80%, 20% 100%, 100% 20%, 80% 0%);
}

.checkbox:checked ~ .checkbox-visual > div:after {
    clip-path: polygon(20% 45%, 0% 65%, 33.33% 100%, 45% 75%);
}
</style>