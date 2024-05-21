import torch
from transformers import BertTokenizer, BertForMaskedLM, TextDataset, DataCollatorForLanguageModeling, Trainer, TrainingArguments

file_path = "./corpus.txt"

tokenizer = BertTokenizer.from_pretrained("bert-base-multilingual-cased")

train_dataset = TextDataset(
    tokenizer=tokenizer,
    file_path=file_path,
    block_size=128,
)

data_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer,
    mlm=True,
    mlm_probability=0.15
)

model = BertForMaskedLM.from_pretrained("bert-base-multilingual-cased")

training_args = TrainingArguments(
    output_dir="./telugu-bert",
    overwrite_output_dir=True,
    num_train_epochs=1,
    per_device_train_batch_size=8,
    save_steps=10_000,
    save_total_limit=2,
)

trainer = Trainer(
    model=model,
    args=training_args,
    data_collator=data_collator,
    train_dataset=train_dataset,
)

trainer.train()
