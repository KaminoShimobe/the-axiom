


const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events } = require('discord.js');

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'spawnDemon') {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('MUITO REAL!')
					.setStyle(ButtonStyle.Primary),
			);

		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Wilder Mothman')
			.setImage('https://static.wikia.nocookie.net/megamitensei/images/e/e0/Mothmanof.png/revision/latest?cb=20210912210516')
			.setDescription('MUITO REAL???');

		await interaction.reply({ content: 'A Demon Appeared!', ephemeral: true, embeds: [embed], components: [row] });
	}
});

client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isButton()) return;
	console.log(interaction);
  
  async execute(interaction) {
    console.log("Interaction correctly read.")
		const filter = i => i.customId === 'primary' && i.user.id === '122157285790187530';

const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

collector.on('collect', async i => {
	await i.update({ content: 'So True!', components: [] });
});

collector.on('end', collected => console.log(`Collected ${collected.size} items`));

	},
});
