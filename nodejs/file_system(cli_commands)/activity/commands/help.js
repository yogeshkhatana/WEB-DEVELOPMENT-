function helpExecutor()
{
    console.log(`List of all commands:
                    1.node mycli.js view <dirname> tree
                    2.node mycli.js view <dirname> flat
                    3.node mycli.js organize <dirname>
                    4.node mycli.js help  `);
}

module.exports={
    helpFn:helpExecutor
};